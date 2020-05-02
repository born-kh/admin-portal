export { default as axios } from './instance';
export { dateFormatter } from './dateTimeForamatter';
export { history } from './history';
export * from './validators';

export const getDocumentStatusText = status => {
  switch (status) {
    case 'NEW':
      return 'New';
    case 'ML_DONE':
      return 'ML Done';
    case 'ML_FAILED':
      return 'Ml Failed';

    case 'HUMAN_CORRECTED':
      return 'Human Corrected';
    case 'HUMAN_APPROVED':
      return 'Human Approved';
    case 'HUMAN_REJECTED':
      return 'Human Rejected';
    case 'HUMAN_FILLED':
      return 'Human Filled';
    case 'HUMAN_CHECK_PASSED':
      return 'Human Check Passed';
    case 'FAILED':
      return 'Failed';

    default:
      return '';
  }
};
