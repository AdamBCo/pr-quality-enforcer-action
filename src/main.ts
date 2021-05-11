import * as core from "@actions/core";
import * as github from "@actions/github";

async function run() {
  try {

    const hasProjects = github.context!.payload!.pull_request!.has_projects
    const milestone = github.context!.payload!.pull_request!.milestone;
    const labels = github.context!.payload!.pull_request!.labels;

    console.log(github.context!.payload!.pull_request);

    enforceMilestone(milestone);
    enforceProjects(hasProjects);
    enforcePlatformLabels(labels);
    enforceTypeLabels(labels)

  } catch (error) {
    core.setFailed(error.message);
  }
}

function enforceMilestone(milestone) {
  // const enabled: boolean = core.getBooleanInput("CHECK_FOR_MILESTONE");
  // if (enabled && !milestone) {
  //   core.setFailed('Please add a milestone to this PR');
  // }
}

function enforceProjects(hasProjects) {
  // const enabled: boolean = core.getBooleanInput("CHECK_FOR_PROJECTS");
  // if (enabled && !hasProjects) {
  //   core.setFailed('Please add a milestone to this PR');
  // }
}

function enforcePlatformLabels(labels) {
  const platformLabels: string[] = getInputArray("PLATFORM_LABELS");
  if (platformLabels.length > 0 && !platformLabels.some((requiredLabel) => labels.find((l) => l.name === requiredLabel))) {
    core.setFailed(`Please add a platform label to this PR: ${platformLabels}`);
  }
}

function enforceTypeLabels(labels) {
  const typeLabels: string[] = getInputArray("TYPE_LABELS");
  if (typeLabels.length > 0 && !typeLabels.some((requiredLabel) => labels.find((l) => l.name === requiredLabel))) {
    core.setFailed(`Please add a type label to this PR: ${typeLabels}`);
  }
}

function getInputArray(name): string[] {
  const rawInput = core.getInput(name, { required: false });
  return rawInput !== "" ? rawInput.split(",") : [];
}

run();
