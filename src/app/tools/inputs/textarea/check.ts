function handleTrue(data: string, dataReform?: string, suggested?: string) {
  return {cleaned: data, cleanedReform: dataReform || null, suggested: suggested || null, status: true, error: null};
}
function handleFakeTrue(data: string, optionnel: boolean) {
  const cleaned = optionnel ? data || null : data;
  return {cleaned, cleanedReform: null, status: !!optionnel, suggested: null, error: null};
}
function handleFalse() {
  return {cleaned: '@@@', cleanedReform: null, status: false, suggested: null, error: 'Format invalide'};
}
function handleNull(optionnel: boolean) {
  if (optionnel) {
    return {cleaned: null, cleanedReform: null, status: true, suggested: null, error: null};
  }
  return {cleaned: 'empty', cleanedReform: null, status: false, suggested: null, error: 'Valeur manquante'};
}
function verif(data, type, optionnel) {
  if (data) {
    if (type === 'message') {
      return verifMessage(data, optionnel);
    }
  }
  return handleNull(optionnel);
}
function verifMessage(data, optionnel) {
  const regex = /[^A-Za-z\d.,!?'&/@+()*%_# \n\rÀÂÄÈÉÊËÎÏÔÖÛÙÇàâäèéêëîïôöûùç-]+/g;
  data = data.replace(regex, '');
  if (data && !/####/.test(data) && data.length < 51) {
    return handleTrue(data);
  }
  return handleFakeTrue(data, false);
}
export default {
  checkData(data, type, optionnel) {
    if (type) {
      return verif(data, type, optionnel);
    }
    return handleFalse();
  }
};
