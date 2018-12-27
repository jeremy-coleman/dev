
const not = (pr)  => (value, idx, source) => !pr(value, idx, source)
const and = (...prs)  => (value, idx, source) => prs.every(pr => pr(value, idx, source));
const or = (...prs)  => (value, idx, source) => prs.some(pr => pr(value, idx, source));


export { not, and, or }