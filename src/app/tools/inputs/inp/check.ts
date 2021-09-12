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
function verif(data, type, optionnel, min, max, key, acc, firstMaj, maj, noReform) {
  if (data) {
    if (type === 'login') {
      return verifEmail(data, optionnel);
    } else if (type === 'telephone') {
      return verifTel(data, optionnel);
    } else if (type === 'siren') {
      return verifSiren(data);
    } else if (type === 'mdp') {
      return verifMdp(data);
    } else if (type === 'immat') {
      return verifImmat(data, optionnel);
    } else if (type === 'immat2') {
      return verifImmat2(data, optionnel);
    } else if (type === 'AZ') {
      return verifAZ(data, acc, firstMaj, maj);
    } else if (type === 'Az') {
      return verifAz(data, acc, firstMaj, maj, noReform);
    } else if (type === 'AZ9') {
      return verifAZ9(data, acc, firstMaj, maj);
    } else if (type === 'Az9') {
      return verifAz9(data, acc, firstMaj, maj, noReform);
    } else if (type === 'sig') {
      return verifSig(data);
    } else if (type === 'message') {
      return verifMessage(data, optionnel);
    } else if (type === 'cp') {
      return verifCp(data, optionnel);
    } else if (type === 'cpFr') {
      return verifCpFr(data, optionnel);
    } else if (type === 'date') {
      return verifDate(data, key, optionnel);
    } else if (type === 'dateMA') {
      return verifDateMA(data, key, optionnel);
    } else if (type === 'heure') {
      return verifHeure(data, key, optionnel);
    } else if (type === 'num') {
      return verifNum(data, min, max, optionnel);
    } else if (type === 'montant') {
      return verifMontant(data, min, max, optionnel);
    } else if (type === 'dpt') {
      return verifDpt(data, optionnel);
    } else if (type === 'numSerie') {
      return verifNumSerie(data, optionnel);
    } else if (type === 'numFormule') {
      return verifNumFormule(data, optionnel);
    } else if (type === 'BisTer') {
      return verifBisTer(data, optionnel);
    } else if (type === 'numSuivi') {
      return verifNumSuivi(data, optionnel);
    } else if (type === 'codeVerif1') {
      return verifCodeVerif1(data, min, max, optionnel);
    } else if (type === 'codeVerifA9') {
      return verifCodeVerifA9(data, optionnel);
    } else if (type === 'codeVerifAZ') {
      return verifCodeVerifAZ(data, optionnel);
    } else if (type === 'codeVerif19') {
      return verifCodeVerif19(data, min, max, optionnel);
    }
  }
  return handleNull(optionnel);
}
function handleFirstCase(data) {
  if (data) {
    let newData = data.slice(0, 1).toUpperCase() + data.slice(1).toLowerCase();
    if (data.match(/ /g)) {
      const dataArray = data.split(/ /g);
      newData = '';
      dataArray.forEach((str, i) => {
        newData += str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
        if (i + 1 < dataArray.length) {
          newData += ' ';
        }
      });
    }
    if (newData.match(/-/g)) {
      const dataArray2 = newData.split(/-/g);
      newData = '';
      dataArray2.forEach((str, i) => {
        newData += str.slice(0, 1).toUpperCase() + str.slice(1);
        if (i + 1 < dataArray2.length) {
          newData += '-';
        }
      });
    }
    return newData;
  }
  return null;
}
function handleMaj(data, maj) {
  if (data) {
    if (maj) {
      return data.toUpperCase();
    }
    return data.toLowerCase();
  }
  return null;
}
function checkKnownDomain(email) {
  const domains = [
    'msn.com', 'icloud.com', 'me.com', 'mac.com', 'googlemail.com', 'gmail.com', 'ymail.com',
    'aim.com', 'google.com', 'aol.com', 'free.fr', 'sfr.fr', 'bbox.fr', 'orange.fr', 'neuf.fr', 'laposte.net',
  ];
  const secondLevelDomains = [
    'yahoo', 'hotmail', 'mail', 'live', 'outlook', 'gmx',
  ];
  const topLevelDomains = [
    'fr', 'com', 'net', 'org', 'eu', 'me',
  ];
  return null;
  // return mailcheck.run({
  //   email, domains, secondLevelDomains, topLevelDomains,
  //   suggested: suggestion => suggestion ? suggestion.full : null,
  //   empty: () => null,
  // });
}
function verifEmail(data, optionnel) {
  data = data.replace(/["(),:;<> ]+/g, '').trim();
  if (data) {
    const dataPart = data.split('@');
    if (dataPart.length === 2) {
      const part0 = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*/;
      const part1 = /(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
      if (part0.test(dataPart[0]) && part1.test(dataPart[1])) {
        const faiReject = ['yopmail'];
        const fai = dataPart[1].split('.');
        if (faiReject.indexOf(fai[0]) === -1) {
          const suggested = checkKnownDomain(data);
          return handleTrue(data, null, suggested);
        }
      }
    }
    return handleFakeTrue(data, optionnel);
  }
  return handleFalse();
}
function verifTel(data, optionnel) {
  data = data.replace(/[^\d+ ]+/g, '');
  if (data) {
    const dataReform = data.replace(/[ ]+/g, '').replace(/^\+330?/, '0').replace(/^00330?/, '0');
    if (dataReform.includes('+') && dataReform[0] !== '+') {
      return handleFakeTrue(data, optionnel);
    } else {
      if (!/^\+/.test(dataReform) && !/^00/.test(dataReform)) {
        const indicatif = Number(dataReform.slice(0, 2));
        if (indicatif > 0 && indicatif < 10 && dataReform.length === 10) {
          return handleTrue(data, dataReform.match(/\d{2}/g).join(' '));
        }
        return handleFakeTrue(data, optionnel);
      }
      if (dataReform.length >= 8) {
        return handleTrue(data, dataReform);
      }
      return handleFakeTrue(data, optionnel);
    }
  }
  return handleFalse();
}
function verifSiren(data) {
  data = data.replace(/[^\d ]+/g, '');
  if (data) {
    const dataReform = data.replace(/[ ]+/g, '');
    const spaces = data && data.match(/ /g) ? data.match(/ /g).length : 0;
    if (data.length === 9 + spaces) {
      return handleTrue(data, dataReform);
    } else if (data.length > 9 + spaces) {
      return handleTrue(data.slice(0, 9 + spaces), dataReform.slice(0, 9));
    }
    return handleTrue(data);
  }
  return handleFalse();
}
function verifMdp(data) {
  return handleTrue(data);
}
function verifImmat(data, optionnel) {
  data = data.replace(/[^A-Z\d -]+/g, '');
  if (data) {
    const dataReform = data.replace(/[ -]+/g, '');
    const numero = dataReform.match(/(\d+|[^\d]+)/g);
    if (numero) {
      if (/[0-9]{1,4}[A-Z]{1,3}([0-9]{2}|2A|2B|97[1-6])$/g.test(dataReform)) {
        if (numero.length === 4) {
          numero[2] = numero[2] + numero[3];
          numero[3] = null;
        }
        return handleTrue(numero.join(' '));
      } else if (/[A-Z]{1,2}[\d]{2,3}[A-Z]{1,2}$/g.test(dataReform)) {
        if (numero[0].length === 2 && numero[1].length === 3 && numero[2].length === 2) {
          return handleTrue(numero.join('-'));
        } else {
          return handleTrue(numero.join(' '));
        }
      }
    }
  }
  return handleFakeTrue(data, optionnel);
}
function verifImmat2(data, optionnel) {
  data = data.replace(/[^A-Z\d -]+/g, '');
  if (data) {
    const dataReform = data.replace(/[ -]+/g, '');
    const numero = dataReform.match(/(\d+|[^\d]+)/g);
    if (numero) {
      if (/[0-9]{1,4}[A-Z]{1,3}([0-9]{2}|2A|2B|97[1-6])$/g.test(dataReform)) {
        if (numero.length === 4) {
          numero[2] = numero[2] + numero[3];
          numero[3] = null;
        }
        return handleTrue(numero.join(' '));
      } else if (/[A-Z]{1,2}[\d]{2,3}[A-Z]{1,2}$/g.test(dataReform)) {
        if (numero[0].length === 2 && numero[1].length === 3 && numero[2].length === 2) {
          return handleTrue(numero.join('-'));
        } else {
          return handleTrue(numero.join(' '));
        }
      }
    }
    return handleTrue(data);
  }
  return handleFakeTrue(data, optionnel);
}
function verifAZ(data, acc, firstMaj, maj) {
  const regex = acc ? /[^A-Z.,!?'&/@+()*%_ ÀÂÄÈÉÊËÎÏÔÖÛÜÙÇ-]+/g : /[^A-Z.,!?'&/@+()*%_ -]+/g;
  data = data.replace(regex, '');
  if (data) {
    const dataReform = firstMaj ? handleFirstCase(data) : handleMaj(data, maj);
    return handleTrue(data, dataReform);
  }
  return handleFalse();
}
function verifAz(data, acc, firstMaj, maj, noReform) {
  const regex = acc ? /[^A-Za-z.,!?'&/@+()*%_ ÀÂÄÈÉÊËÎÏÔÖÛÜÙÇàâäèéêëîïôöûüùç-]+/g : /[^A-Za-z.,!?'&/@+()*%_ -]+/g;
  data = data.replace(regex, '');
  if (data) {
    let dataReform = data;
    if (!noReform) {
      dataReform = firstMaj ? handleFirstCase(data) : handleMaj(data, maj);
    }
    return handleTrue(data, dataReform);
  }
  return handleFalse();
}
function verifAZ9(data, acc, firstMaj, maj) {
  const regex = acc ? /[^A-Z\d.,!?'&/@+()*%_ ÀÂÄÈÉÊËÎÏÔÖÛÜÙÇ-]+/g : /[^A-Z\d.,!?'&/@+()*%_ -]+/g;
  data = data.replace(regex, '');
  if (data) {
    const dataReform = firstMaj ? handleFirstCase(data) : handleMaj(data, maj);
    return handleTrue(data, dataReform);
  }
  return handleFalse();
}
function verifAz9(data, acc, firstMaj, maj, noReform) {
  const regex = acc ? /[^A-Za-z\d.,!?'&/@+()*%_ ÀÂÄÈÉÊËÎÏÔÖÛÜÙÇàâäèéêëîïôöûüùç-]+/g : /[^A-Za-z\d.,!?'&/@+()*%_ -]+/g;
  data = data.replace(regex, '');
  if (data) {
    let dataReform = data;
    if (!noReform) {
      dataReform = firstMaj ? handleFirstCase(data) : handleMaj(data, maj);
    }
    return handleTrue(data, dataReform);
  }
  return handleFalse();
}
function verifSig(data) {
  data = data.replace(/[^A-Z\d ]+/g, '');
  if (data) {
    return handleTrue(data);
  }
  return handleFalse();
}
function verifMessage(data, optionnel) {
  const regex = /[^A-Za-z\d.,!?'&/@+()*%_# ÀÂÄÈÉÊËÎÏÔÖÛÙÇàâäèéêëîïôöûùç-]+/g;
  data = data.replace(regex, '');
  if (data && !/####/.test(data)) {
    return handleTrue(data);
  }
  return handleFakeTrue(data, optionnel);
}
function verifCp(data, optionnel) {
  data = data.replace(/[^A-Z\d]+/g, '');
  if (data) {
    return handleTrue(data);
  }
  return handleFakeTrue(data, optionnel);
}
function verifCpFr(data, optionnel) {
  data = data.replace(/[^\d]+/g, '');
  if (data && data.length === 5) {
    return handleTrue(data);
  }
  return handleFakeTrue(data, optionnel);
}
function verifDate(data, key, optionnel) {
  data = data.replace(/[ -]+/g, '/').replace(/[^\d/]+/g, '');
  if (data) {
    const dataArray = data.replace('//', '/').split('/');
    const [J, M, A] = dataArray;
    if (dataArray.length === 1) {
      if (J.length === 2 && key && key !== 'Backspace') {
        return handleFakeTrue(data + '/', optionnel);
      } else if (J.length > 6) {
        const dataFormated = `${J.slice(0, 2)}/${J.slice(2, 4)}/${J.slice(4, 8)}`;
        return handleFakeTrue(dataFormated, optionnel);
      } else if (J.length > 2) {
        const dataFormated = J.match(/\d{1,2}/g).join('/');
        return handleFakeTrue(dataFormated, optionnel);
      }
      return handleFakeTrue(data, optionnel);
    } else if (dataArray.length === 2) {
      if (J.length === 1) {
        dataArray[0] = '0' + dataArray[0];
      }
      if (M.length === 2 && key && key !== 'Backspace') {
        return handleFakeTrue(dataArray.join('/') + '/', optionnel);
      } else if (M.length === 4) {
        return handleFakeTrue(J + '//' + M, optionnel);
      }
      return handleFakeTrue(dataArray.join('/'), optionnel);
    } else if (dataArray.length >= 3) {
      const date = new Date();
      const thisYear = date.getFullYear();
      const annee = String(thisYear);
      if (dataArray.length > 3) {
        const [j, m, ...rest] = dataArray;
        dataArray[2] = rest.join('').replace('/', '');
        dataArray.splice(3, 1);
      }
      if (M.length < 2) {
        return handleFakeTrue(dataArray.join('/'), optionnel);
      }
      if (key && key !== 'Backspace') {
        if (A.length === 2 && A !== '19' && A !== '20') {
          if (A >= 0 && A <= parseFloat(annee.slice(2))) {
            dataArray[2] = '20' + dataArray[2];
          } else {
            dataArray[2] = '19' + dataArray[2];
          }
        }
      }
      if (J > 0 && J <= 31 && M > 0 && M <= 12 && parseFloat(dataArray[2]) > 1900 && parseFloat(dataArray[2]) <= thisYear) {
        return handleTrue(dataArray.join('/'));
      }
      return handleFakeTrue(dataArray.join('/'), optionnel);
    }
  }
  return handleFakeTrue('', optionnel);
}
function verifDateMA(data, key, optionnel) {
  data = data.replace(/[^\d/]+/g, '');
  if (data) {
    const dataArray = data.replace('//', '/').split('/');
    const [M] = dataArray;
    if (dataArray.length === 1) {
      if (M.length === 2 && key && key !== 'Backspace') {
        return handleFakeTrue(data + '/', optionnel);
      } else if (M.length > 2) {
        const dataFormated = M.match(/\d{1,2}/g).join('/');
        return handleFakeTrue(dataFormated, optionnel);
      }
      return handleFakeTrue(data, optionnel);
    } else if (dataArray.length >= 2) {
      const date = new Date();
      const thisYear = date.getFullYear();
      const annee = String(thisYear).slice(2);
      if (dataArray.length > 2) {
        const [m, ...rest] = dataArray;
        dataArray[1] = rest.join('').replace('/', '');
        dataArray.splice(2, 1);
      }
      if (M.length === 1) {
        dataArray[0] = '0' + dataArray[0];
      }
      if (M > 0 && M <= 12 && parseFloat(dataArray[1]) >= Number(annee) && parseFloat(dataArray[1]) <= (Number(annee) + 15)) {
        return handleTrue(dataArray.join('/'));
      }
      return handleFakeTrue(dataArray.join('/'), optionnel);
    }
  }
  return handleFakeTrue('', optionnel);
}
function verifHeure(data, key, optionnel) {
  data = data.replace(/[^\d:]/g, '');
  if (data) {
    const dataArray = data.replace('::', ':').split(':');
    const [H, M] = dataArray;
    if (dataArray.length === 1) {
      if (H.length === 2 && key && key !== 'Backspace') {
        return handleFakeTrue(data + ':', optionnel);
      } else if (H.length > 2) {
        const dataFormated = H.match(/\d{1,2}/g).join(':');
        return handleFakeTrue(dataFormated, optionnel);
      }
      return handleFakeTrue(data, optionnel);
    } else if (dataArray.length >= 2) {
      if (dataArray.length > 2) {
        const [h, ...rest] = dataArray;
        dataArray[1] = rest.join('').replace(':', '');
        dataArray.splice(2, 1);
      }
      if (H.length === 1) {
        return handleFakeTrue(dataArray.join(':'), optionnel);
      }
      if (H >= 0 && H <= 23 && M >= 0 && M <= 59) {
        return handleTrue(dataArray.join(':'));
      }
      return handleFakeTrue(dataArray.join(':'), optionnel);
    }
  }
  return handleFakeTrue('', optionnel);
}
function verifNum(data, min, max, optionnel) {
  data = String(data).replace(/[^\d]+/g, '');
  if (data && data >= min && data <= max) {
    return handleTrue(data);
  }
  return handleFakeTrue(data, optionnel);
}
function verifMontant(data, min, max, optionnel) {
  data = String(data).replace(/[^\d,.]+/g, '');
  if (data) {
    data = data.replace(',', '.');
    if (data && data >= min && data <= max) {
      return handleTrue(data);
    }
  }
  return handleFakeTrue(data, optionnel);
}
function verifDpt(data, optionnel) {
  data = data.replace(/[^A-Z\d]+/g, '');
  if (data) {
    if (/^\d{2}$|^[9][7][1-6]$|^2A$|^2B$/g.test(data)) {
      return handleTrue(data);
    }
  }
  return handleFakeTrue(data, optionnel);
}
function verifNumSerie(data, optionnel) {
  data = data.replace(/[^A-Z\d]+/g, '');
  if (data && data.length >= 4 && data.length < 18) {
    return handleTrue(data);
  }
  return handleFakeTrue(data, optionnel);
}
function verifNumFormule(data, optionnel) {
  data = data.replace(/[^A-Z\d]+/g, '');
  if (data && data.length === 11) {
    return handleTrue(data);
  }
  return handleFakeTrue(data, optionnel);
}
function verifBisTer(data, optionnel) {
  data = data.replace(/[^A-Z]+/g, '');
  if (data && data.length === 1) {
    return handleTrue(data);
  } else if (data === 'BIS') {
    return handleTrue('B');
  } else if (data === 'TER') {
    return handleTrue('T');
  }
  return handleFakeTrue(data, optionnel);
}
function verifNumSuivi(data, optionnel) {
  data = data.replace(/[^A-Z\d' -]+/g, '');
  if (data && data.length >= 11 && data.length <= 15) {
    return handleTrue(data);
  }
  return handleFakeTrue(data, optionnel);
}
function verifCodeVerif1(data, min, max, optionnel) {
  data = data.replace(/[^\d]+/g, '');
  if (data && data >= min && data <= max) {
    return handleTrue(data);
  }
  return handleFakeTrue('', optionnel);
}
function verifCodeVerifA9(data, optionnel) {
  data = data.replace(/[^A-Z\d ]+/g, '');
  if (data) {
    return handleTrue(data);
  }
  return handleNull(optionnel);
}
function verifCodeVerifAZ(data, optionnel) {
  data = data.replace(/[^A-Z]+/g, '');
  if (data) {
    return handleTrue(data);
  }
  return handleNull(optionnel);
}
function verifCodeVerif19(data, min, max, optionnel) {
  data = data.replace(/[^\d]+/g, '');
  if (data && data >= min && data <= max) {
    return handleTrue(data);
  }
  return handleNull(optionnel);
}

export default {
  // TODO : check safe regex
  checkData(data, type, optionnel, min, max, key) {
    let newType = null;
    let acc = false;
    let firstMaj = false;
    let maj = false;
    let noReform = false;
    if (type) {
      if (type === 'login') {
        data = data ? data.toLowerCase() : null;
      } else if (type.slice(0, 4) === 'text') {
        const array = type.split(/[_]+/g);
        newType = array[0].slice(4);
        acc = array.indexOf('acc') > -1;
        firstMaj = array.indexOf('firstMaj') > -1;
        maj = array.indexOf('maj') > -1;
        noReform = array.indexOf('noReform') > -1;
        if (!acc) {
          data = data.normalize('NFD').replace(/[\u0300-\u036f]+/g, '');
        }
      } else if (type !== 'mdp' && type !== 'message') {
        if (data && typeof data === 'string') {
          data = data.toUpperCase();
        }
        data = data.normalize('NFD').replace(/[\u0300-\u036f]+/g, '');
      }
      data = data && typeof data === 'string' ? data.trimLeft() : data;
      return verif(data, newType || type, optionnel, min, max, key, acc, firstMaj, maj, noReform);
    }
    return handleFalse();
  }
};
