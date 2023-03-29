
export default function getHighestPair(empl) {
    let pairs = {};
    let daysTogether = {};

    if (empl)
      empl.forEach((el1) => {
        /*
          .slice() is used to exclude the current employee and employees before him
          from the search which slightly reduces complexity. This is because
          employee 5 + employee 13 is the same as employee 13 + employee 5
        */
        empl.slice(empl.indexOf(el1) + 1, empl.length).forEach((el2) => {
          // get start and end date of each of employee
          if (el1[0] !== el2[0]) {
            const startDate1 = new Date(el1[2]);
            const endDate1 = el1[3] === "NULL" ? new Date() : new Date(el1[3]); /// ПРОБЛЕМ ПРИ ПРОВЕРКАТА НА NULL
            const startDate2 = new Date(el2[2]);
            const endDate2 = el2[3] === "NULL" ? new Date() : new Date(el2[3]);
  
            // check if they are in the same team (working on the same project)
            if (el1[1] === el2[1]) {
              if (startDate1 <= endDate2 && startDate2 <= endDate1) {
                // calculate the start and end day that we need
                const start = startDate1 <= startDate2 ? startDate2 : startDate1;
                const end = endDate1 <= endDate2 ? endDate1 : endDate2;
                if (end >= startDate2) {
                  // put them inside this formula and we get the time they have worked together in days
                  const diffTime = Math.abs(end - start);
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                  const x = `${el1[0]}${el2[0]}`;
  
                  if (!daysTogether[x]) Object.assign(daysTogether, { [x]: 0 });
                  daysTogether[x] = 1 * daysTogether[x] + diffDays;
  
                  if (!pairs[x]) Object.assign(pairs, { [x]: [] });
                  pairs[x] = [...pairs[x], [el1[0], el2[0], el1[1], diffDays]];
                }
              }
            }
          }
        });
      });
    /*
      gets the index of the pair that have worked together the longest toghether from
      "daysTogether" which keeps count of the days for each project
    */
    return pairs[
      Object.keys(daysTogether).reduce((a, b) =>
        daysTogether[a] > daysTogether[b] ? a : b
      )
    ];
  }
  
export const calculateFunc = data => {
  const overlap = (e1d1, e1d2, e2d1, e2d2) => {
  
    const startDate1 = new Date(e1d1);
    const endDate1 = e1d2 === null ? new Date() : new Date(e1d2);
    const startDate2 = new Date(e2d1);
    const endDate2 = e2d2 === null ? new Date() : new Date(e2d2);
  
    const start = startDate1 < startDate2 ? startDate2 : startDate1;
    const end = endDate1 < endDate2 ? endDate1 : endDate2;
  
    if (end >= start) {
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    
    return 0;
  };
  
  const result = data.reduce((acc, el) => {
    let c = acc[el[1]];
    if (!c) {
      c = acc[el[1]] = {
        overlap: 0,
        e1: 0,
        e2: 0,
        data: []
      };
    };
    
    c.data.forEach(d => {
      const o = overlap(d[2], d[3], el[2], el[3]);
      if (o > c.overlap) {
        c.overlap = o;
        c.e1 = d[0];
        c.e2 = el[0];
      }
    });
    
    c.data.push(el);
    return acc;
  
  }, {});
  
  const deObjectify = Object.entries(result).map(([projectId, {e1, e2, overlap}]) => ({e1, e2, projectId, overlap}));
  console.log('ITS WORKING', deObjectify)
  return deObjectify
}