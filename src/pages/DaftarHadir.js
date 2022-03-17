import React from 'react';
import Table from '../components/Table/Table';

import Students from '../assets/data/students.json';

function DaftarHadir() {
  return <Table data={Students} />;
}

export default DaftarHadir;
