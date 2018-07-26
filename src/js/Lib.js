import moment from "moment";

module.exports.calcDate = function(date) {
  let now = moment();
  let long = now.diff(date, "seconds");

  // segundos
  if (long < 60) {
    return `Publicado hace ${Math.trunc(long)} segundos`;


    // minutos
  } else if ((long >= 60) & (long < 3600)) {
    return `Publicado hace  ${Math.trunc(long / 60)} minutos`;
  

    // horas
} else if ((long >= 3600) & (long < 86400)) {
    return `Publicado hace  ${Math.trunc(long / 3600)} horas`;


    // días
} else if ((long >= 86400) & (long < 604800)) {
    var dateObject = moment(date);
    return `Publicado el ${dateObject.format("dddd")}`;

    
    // default
} else {
    var dateObject = moment(date);
    return `Publicado el ${dateObject.format("DD/MM/YYYY HH:mm:ss")}`;
  }
};
