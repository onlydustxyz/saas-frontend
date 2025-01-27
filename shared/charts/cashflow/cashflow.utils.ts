import { SeriesSankeyNodesOptionsObject, SeriesSankeyPointOptionsObject } from "highcharts";

import { AnyType } from "@/core/kernel/types";

export function buildNodesAndDataForSankey(payload: AnyType) {
  const nodes: SeriesSankeyNodesOptionsObject[] = [];
  const data: SeriesSankeyPointOptionsObject[] | (string | number)[][] = [];

  // Helper function to add unique nodes
  const addNode = (id: string, name: string, color?: string) => {
    if (!nodes.find(node => node.id === id)) {
      nodes.push({ id, name, color });
    }
  };

  // Add sponsor nodes
  payload.sponsors.map((sponsor: AnyType) => {
    addNode(sponsor.id, sponsor.name, sponsor.color);
  });

  // Add program nodes and links
  payload.programs.map((program: AnyType) => {
    addNode(program.id, program.name, program.color);
    data.push([program.sponsorId, program.id, program.funding]);
  });

  // Add project nodes and links
  payload.projects.map((project: AnyType) => {
    addNode(project.id, project.name, project.color);
    data.push([project.programId, project.id, project.funding]);
  });

  // Add contributor nodes and links
  payload.contributors.map((contributor: AnyType) => {
    addNode(contributor.id, contributor.name);
    data.push([contributor.projectId, contributor.id, contributor.amount]);
  });

  return { nodes, data };
}
