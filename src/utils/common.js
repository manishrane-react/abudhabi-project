export const convertDOB = (date) => {
    let dob = new Date(date);
    let dd = dob.getDate();
    let mm = dob.getMonth() + 1;

    let yyyy = dob.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    return dd + '/' + mm + '/' + yyyy;
}

export const getAddress = (street, city, country, postcode) => {
    return `${street.number} ${street.name} ${city} ${country} ${postcode}`
}

export const getCellNumber = (cell) => {
    return cell.replace(/-/g, "");
}