import { ContributionActivityInterface } from "@/core/domain/contribution/models/contribution-activity-model";
import { IssueInterface } from "@/core/domain/issue/models/issue-model";

export function issueFromContribution(contribution: ContributionActivityInterface): IssueInterface {
  return {
    id: parseInt(contribution.githubId),
    number: contribution.githubNumber,
    title: contribution.githubTitle,
    status: issueStatus(contribution.githubStatus),
    htmlUrl: contribution.githubHtmlUrl,
    repo: contribution.repo,
    author: {
      ...contribution.githubAuthor,
      isRegistered: false,
    },
    createdAt: contribution.createdAt,
    closedAt: contribution.completedAt,
    body: contribution.githubBody,
    commentCount: contribution.githubCommentCount || 0,
    labels: contribution.githubLabels || [],
    applicants: contribution.applicants,
    assignees: contribution.contributors,
    languages: contribution.languages || [],
    project: contribution.project,
  };
}

function issueStatus(status: string) {
  switch (status) {
    case "OPEN":
      return "OPEN";
    case "COMPLETED":
      return "COMPLETED";
    default:
      return "CANCELLED";
  }
}

export function prefillLabel() {
  const arrayOfLabels = [
    "Can I take this issue?",
    "I'd love to work on this!",
    "Can I be assigned to this?",
    "Can I handle this task?",
    "I'd like to take this issue.",
    "Can I tackle this one?",
    "Let me try this one!",
    "May I pick this up?",
    "I'd love to give this a go.",
    "Can I work on this, please?",
    "Is this issue still available?",
    "Could I take a shot at this?",
    "May I take care of this?",
    "Can I jump on this task?",
    "Let me handle this issue!",
    "I'd be happy to do this.",
    "Could I try solving this?",
    "Can I contribute to this one?",
    "Is it okay if I take this?",
    "May I try my hand at this?",
    "I’d like to resolve this.",
    "Could I take on this issue?",
    "Can I start working on this?",
    "May I take this issue on?",
    "I’d like to work on this.",
    "Mind if I take this issue?",
    "Could I grab this task?",
    "I’m interested in this one.",
    "Can I attempt this issue?",
    "Would love to tackle this!",
    "May I be assigned to this?",
    "I'd like to handle this task.",
    "Can I try solving this issue?",
    "Mind if I try this one?",
    "I’d like to help with this.",
    "Can I take this from here?",
    "Can I take care of this issue?",
    "Could I be assigned to this?",
    "May I handle this issue?",
    "I’d love to work on this task.",
    "Is it okay if I tackle this?",
    "Could I take over this issue?",
  ];

  const randomIndex = Math.floor(Math.random() * arrayOfLabels.length);

  return arrayOfLabels[randomIndex];
}
