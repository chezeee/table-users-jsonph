export const columns = [
  {
    title: '#:',
    getDataVal: ({ id }) => id,
  },
  {
    title: 'Name:',
    getDataVal: ({ name: fName }) => fName,
  },
  {
    title: 'Email:',
    getDataVal: ({ email }) => (
      <a href={`mailto:${email}`}>{email}</a>
    ),
  },
  {
    title: 'Address:',
    getDataVal: ({ address: { street, suite, city } }) =>
      `${city}, ${street}, ${suite}`,
  },
  {
    title: 'Phone number:',
    getDataVal: ({ phone }) => (
      <a href={`tel:${phone}`}>{phone}</a>
    ),
  },
  {
    title: 'Website:',
    getDataVal: ({ website }) => (
      <a href={`https://${website}`}>{website}</a>
    ),
  },
  {
    title: 'Company name:',
    getDataVal: ({ company: { name: cName } }) => cName,
  },
];
