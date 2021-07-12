const { species, employees, prices } = require('./data');

const data = require('./data');

function getSpeciesByIds(...ids) {
  return species.filter((item) => ids.includes(item.id));
}

function getAnimalsOlderThan(animal, age) {
  const animals = species.find((item) => item.name === animal);
  return animals.residents.every((resident) => resident.age >= age);
}

function getEmployeeByName(employeeName) {
  if (!employeeName) return {};
  return employees.find((emp) => emp.firstName === employeeName || emp.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some((employee) => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmp = { id, firstName, lastName, managers, responsibleFor };
  employees.push(newEmp);
}

function countAnimals(animal) {
  if (!animal) {
    const animalCount = {};
    species.forEach((item) => {
      animalCount[item.name] = item.residents.length;
    });
    return animalCount;
  } const animals = species.find((item) => item.name === animal);
  return animals.residents.length;
}

function calculateEntry(entrants) {
  if (entrants === undefined || entrants === {}) {
    return 0;
  }
  return Object.keys(entrants)
    .reduce((accumulator, currentValue) =>
      accumulator + (entrants[currentValue] * prices[currentValue]), 0);
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  const dataHour = { ...data.hours };
  Object.entries(dataHour).forEach((day) => {
    dataHour[day[0]] = `Open from ${day[1].open}am until ${day[1].close - 12}pm`;
    if (day[1].open === day[1].close) {
      dataHour[day[0]] = 'CLOSED';
    }
  });
  return (dayName !== undefined) ? { [dayName]: dataHour[dayName] } : dataHour;
}

function getOldestFromFirstSpecies(id) {
  const funcionario = data.employees.find((employee) => employee.id === id);
  const especie = data.species.find((specie) => specie.id === funcionario.responsibleFor[0]);
  const maisVelho = especie.residents.sort((a, b) => b.age - a.age);
  return Object.values(maisVelho[0]);
}

function increasePrices(percentage) {
  const { Adult, Child, Senior } = prices;
  const adjustPrice = (entry) => Math.ceil(entry * (percentage + 100)) / 100;
  data.prices.Adult = adjustPrice(Adult);
  data.prices.Child = adjustPrice(Child);
  data.prices.Senior = adjustPrice(Senior);
}

function getEmployeeCoverage(idOrName) {
  // seu código aqui
}

module.exports = {
  calculateEntry,
  getSchedule,
  countAnimals,
  getAnimalMap,
  getSpeciesByIds,
  getEmployeeByName,
  getEmployeeCoverage,
  addEmployee,
  isManager,
  getAnimalsOlderThan,
  getOldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
