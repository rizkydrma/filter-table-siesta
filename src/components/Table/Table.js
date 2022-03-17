import React, { useEffect, useState } from 'react';
import Button from '../../elements/Button/Button';
import './Table.css';

function Table({ data }) {
  let { students, sicks, permitted_leaves } = data;
  let [header, setHeader] = useState([]);
  let [body, setBody] = useState([]);
  let [filter, setFilter] = useState({
    berdasarkan: undefined,
    isi: undefined,
    data: [],
  });

  const tableHandler = (data) => {
    setHeader(Object.keys(data[0]));
    setBody(data);
  };

  const handleChange = (data) => {
    switch (data) {
      case 'kelas':
        let uniqClass = [];
        let dataClass = students.map((el) => el.class);
        dataClass.forEach((val) => {
          if (!uniqClass.includes(val)) {
            uniqClass.push(val);
          }
        });

        setFilter({
          ...filter,
          berdasarkan: data,
          data: uniqClass,
        });
        break;
      case 'kehadiran':
        setFilter({
          ...filter,
          berdasarkan: data,
          data: ['students', 'sicks', 'permitted_leaves'],
        });
        break;
      case 'sekolah':
        let uniqSchool = [];
        let dataSchool = students.map((el) => el.school);
        dataSchool.forEach((val) => {
          if (!uniqSchool.includes(val)) {
            uniqSchool.push(val);
          }
        });
        setFilter({
          ...filter,
          berdasarkan: data,
          data: uniqSchool,
        });
        break;
      default:
    }
  };

  const filterDataHandler = ({ berdasarkan, isi }) => {
    let values;
    if (berdasarkan === 'kehadiran') {
      if (isi === 'sicks') {
        tableHandler(sicks);
      } else if (isi === 'permitted_leaves') {
        tableHandler(permitted_leaves);
      } else if (isi === 'students') {
        tableHandler(students);
      }
    } else if (berdasarkan === 'sekolah') {
      values = students.filter((student) => student.school === isi);
      tableHandler(values);
    } else if (berdasarkan === 'kelas') {
      values = students.filter((student) => student.class === isi);
      tableHandler(values);
    }
  };

  useEffect(() => {
    tableHandler(students);
  }, [students]);

  return (
    <div className="table__container">
      <div className="table__filter">
        <div className="filter-text">Filter berdasarkan:</div>
        <select
          className="filter-select"
          value={filter.berdasarkan}
          onChange={(e) => handleChange(e.target.value)}
        >
          <option value="">--Pilih Berdasarkan--</option>
          <option value="kelas">kelas</option>
          <option value="kehadiran">kehadiran</option>
          <option value="sekolah">sekolah</option>
        </select>

        {filter.data.length > 0 ? (
          <select
            className="filter-select"
            value={filter.value}
            onChange={(e) => setFilter({ ...filter, isi: e.target.value })}
          >
            <option>--Pilih Data --</option>
            {filter.data.map((item, i) => (
              <option key={i} value={item}>
                {item}
              </option>
            ))}
          </select>
        ) : (
          <select className="filter-select" disabled>
            <option>--Pilih Data --</option>
          </select>
        )}

        <Button
          className="btn btn-primary btn-sm"
          onClick={() => filterDataHandler(filter)}
        >
          Filter Data
        </Button>
      </div>

      <table>
        <thead>
          <tr>
            {header.map((item, i) => {
              return i > 0 ? <th key={i}>{item}</th> : null;
            })}
          </tr>
        </thead>
        <tbody>
          {body.map((student, i) => (
            <tr key={i}>
              <td>{student.name}</td>
              <td>{student.nisn}</td>
              <td>{student.class}</td>
              <td>{student.school}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
