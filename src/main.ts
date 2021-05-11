import * as core from '@actions/core';
import * as github from '@actions/github';

async function run() {
    try {
        const milestone = github.context!.payload!.pull_request!.milestone;
        const labels = github.context!.payload!.pull_request!.labels;

        enforceMilestone(milestone);
        enforceLabels(labels);

    } catch (error) {
        core.setFailed(error.message);
    }
}

function enforceMilestone(milestone) {
    if (!milestone) {
        const requiredLabelsAnyDescription = getInputString('REQUIRED_MILESTONE_DESCRIPTION', `Please add a milestone to this PR`);
        core.setFailed(requiredLabelsAnyDescription);
    }
}

function enforceLabels(labels) {
    const requiredLabels: string[] = getInputArray('REQUIRED_LABELS');
    if (requiredLabels.length > 0 && !requiredLabels.some(requiredLabel => labels.find((l) => l.name === requiredLabel))) {
        const requiredLabelsAnyDescription = getInputString('REQUIRED_LABELS_DESCRIPTION', `Please add labels to this PR: ${requiredLabels}`);
        core.setFailed(requiredLabelsAnyDescription);
    }
}

function getInputArray(name): string[] {
    const rawInput = core.getInput(name, {required: false});
    return rawInput !== '' ? rawInput.split(',') : [];
}

function getInputString(name, defaultValue): string {
    const rawInput = core.getInput(name, {required: false});
    return rawInput !== '' ? rawInput : defaultValue;
}

run();
