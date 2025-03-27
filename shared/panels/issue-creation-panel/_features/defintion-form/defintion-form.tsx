import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { GithubReactQueryAdapter } from "@/core/application/react-query-adapter/github";
import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { useGithubPermissionsContext } from "@/shared/features/github-permissions/github-permissions.context";
import { usePosthog } from "@/shared/tracking/posthog/use-posthog";
import { Button } from "@/shared/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/shared/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { Textarea } from "@/shared/ui/textarea";
import { TypographyMuted } from "@/shared/ui/typography";

import { useIssueCreationPanel } from "../../issue-creation-panel.context";

export const formSchema = z.object({
  context: z.string().min(1),
  requirements: z.string().min(1),
  type: z.string().min(1),
  repoId: z.number().min(1),
});

function TypeField({ form }: { form: UseFormReturn<z.infer<typeof formSchema>> }) {
  return (
    <FormField
      control={form.control}
      name="type"
      render={({ field }) => (
        <FormItem className="w-full">
          <div className="flex flex-col space-y-1">
            <FormLabel>Type</FormLabel>
            <FormDescription>Select the type of issue</FormDescription>
          </div>
          <FormControl>
            <Select {...field} onValueChange={value => field.onChange(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select the type" />
              </SelectTrigger>
              <SelectContent className="z-[9999]">
                <SelectItem value="FEATURE">Feature</SelectItem>
                <SelectItem value="BUG">Bug</SelectItem>
                <SelectItem value="IMPROVEMENT">Improvement</SelectItem>
                <SelectItem value="DOCUMENTATION">Documentation</SelectItem>
                <SelectItem value="OTHER">Other</SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
        </FormItem>
      )}
    />
  );
}

function RepoField({ form }: { form: UseFormReturn<z.infer<typeof formSchema>> }) {
  const { project } = useIssueCreationPanel();
  const { data: userOrganizations } = GithubReactQueryAdapter.client.useGetMyOrganizations({});
  const { organizations } = userOrganizations ?? {};

  const repos = useMemo(() => {
    if (!project?.repos || !organizations) return [];

    return project.repos
      .map(repo => {
        // Find the organization that contains this repo
        const organization = organizations.find(org => org.repos.some(orgRepo => orgRepo.id === repo.id));

        return {
          label: repo.name,
          value: repo.id,
          disabled: organization ? organization.isMissingPermissions() : true,
        };
      })
      .filter(repo => {
        // Only include repos that are found in organizations
        return organizations.some(org => org.repos.some(orgRepo => orgRepo.id === repo.value));
      });
  }, [project?.repos, organizations]);

  return (
    <FormField
      control={form.control}
      name="repoId"
      render={({ field }) => (
        <FormItem className="w-full">
          <div className="flex flex-col space-y-1">
            <FormLabel>Repositories</FormLabel>
            <FormDescription>
              Select the related project or repository. Some repositories may be disabled if additional GitHub
              permissions are needed. You can update your GitHub permissions by editing your project settings.
            </FormDescription>
          </div>
          <FormControl>
            <Select
              {...field}
              value={field.value ? field.value.toString() : undefined}
              onValueChange={value => field.onChange(parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select the repository" />
              </SelectTrigger>
              <SelectContent className="z-[9999]">
                {repos.map(repo => (
                  <SelectItem key={repo.value} value={repo.value.toString()} disabled={repo.disabled}>
                    {repo.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
        </FormItem>
      )}
    />
  );
}

function ContextField({ form }: { form: UseFormReturn<z.infer<typeof formSchema>> }) {
  return (
    <FormField
      control={form.control}
      name="context"
      render={({ field }) => (
        <FormItem className="w-full">
          <div className="flex flex-col space-y-1">
            <FormLabel>Context</FormLabel>
            <FormDescription>Briefly describe the problem or need.</FormDescription>
          </div>
          <FormControl>
            <Textarea
              placeholder="Briefly describe the problem or need."
              className="max-h-[300px]"
              onInput={e => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = "0px";
                target.style.height = target.scrollHeight + "px";
              }}
              {...field}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}

function RequirementsField({ form }: { form: UseFormReturn<z.infer<typeof formSchema>> }) {
  return (
    <FormField
      control={form.control}
      name="requirements"
      render={({ field }) => (
        <FormItem className="w-full">
          <div className="flex flex-col space-y-1">
            <FormLabel>What Needs to be Done</FormLabel>
            <FormDescription>What should happen once the issue is resolved?</FormDescription>
          </div>
          <FormControl>
            <Textarea
              placeholder="Describe the specific requirements for the issue."
              className="max-h-[300px]"
              onInput={e => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = "0px";
                target.style.height = target.scrollHeight + "px";
              }}
              {...field}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
export function DefintionForm() {
  const { setStep, projectId, setIssue, project } = useIssueCreationPanel();
  const { isProjectOrganisationMissingPermissions, setIsGithubPermissionModalOpen } = useGithubPermissionsContext();
  const { capture } = usePosthog();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { mutateAsync: composeIssue, isPending } = ProjectReactQueryAdapter.client.useProjectIssueComposerCompose({
    pathParams: {
      projectId,
    },
    options: {
      onError: () => {
        toast.error("Failed to generate issue");
      },
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (isProjectOrganisationMissingPermissions(values.repoId)) {
      setIsGithubPermissionModalOpen(true);
      return;
    }

    const issue = await composeIssue({
      repoId: values.repoId,
      requirements: values.requirements,
      context: values.context,
      type: values.type as "FEATURE" | "BUG" | "IMPROVEMENT" | "DOCUMENTATION" | "OTHER",
    });

    setIssue({
      title: issue.title,
      body: issue.body,
      repoId: values.repoId,
      issueCompositionId: issue.issueCompositionId,
      additionalQuestions: !!issue.additionalQuestions?.trim() ? issue.additionalQuestions : undefined,
    });

    capture("project_issue_compose_compose", { project_id: project?.id ?? "" });

    setStep("creation");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-1 flex-col justify-between gap-6">
        <div className="flex flex-col gap-6 pt-4">
          <TypographyMuted>
            Provide key details to help contributors understand and address your request efficiently. Fill out the
            fields below, and we'll generate a well-structured issue for your repository.
          </TypographyMuted>
          <div className="flex flex-col gap-4">
            <RepoField form={form} />
            <TypeField form={form} />
            <ContextField form={form} />
            <RequirementsField form={form} />
          </div>
        </div>
        <Button size="lg" className="w-full" type="submit" loading={isPending}>
          Generate Issue
        </Button>
      </form>
    </Form>
  );
}
