import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import reportWebVitals from './utils/reportWebVitals';
import TableComponent from "./components/TableComponent";
import * as dataStore from './utils/dataStore'

function onClickFunction (e, i) {
  alert('event.target.innerHTML: ' + e.target.innerHTML + '\n\nitem: ' + JSON.stringify(i));
}

ReactDOM.render(

  <React.StrictMode>

      <h1>Table #1</h1>
      <table id="infoTable" border="0" width="400" height="50">
        <tbody>
          <tr>
            <td>Data:</td>
            <td>local</td>
          </tr>
          <tr>
            <td>Pagination:</td>
              <td className={"disabled"}>disabled</td>
          </tr>
          <tr>
            <td>Search:</td>
            <td className={"disabled"}>disabled</td>
          </tr>
          <tr>
            <td>onClickFunction:</td>
            <td className={"enabled"}>enabled</td>
          </tr>
          <tr>
              <td>Sort on:</td>
              <td>title</td>
          </tr>
        </tbody>
      </table>

      <TableComponent data={dataStore.requestDataSmall()} columns={["title", "date", "price"]} sortColumns={["title"]} pagination={false} search={false} debug={true} onClickFunction={(event, item)=>onClickFunction(event,item)}/>

      <h1>Table #2</h1>
      <table id="infoTable" border="0" width="400" height="50">
        <tbody>
          <tr>
            <td>Data:</td>
            <td>local</td>
          </tr>
          <tr>
            <td>Pagination:</td>
              <td className={"disabled"}>disabled</td>
          </tr>
          <tr>
            <td>Search:</td>
              <td className={"enabled"}>enabled</td>
          </tr>
          <tr>
            <td>onClickFunction:</td>
            <td className={"disabled"}>disabled</td>
          </tr>
          <tr>
              <td>Sort on:</td>
              <td>category, status</td>
          </tr>
        </tbody>
      </table>

      <TableComponent data={dataStore.requestDataSmall()} columns={["id", "category", "status", "author"]} sortColumns={["category","author"]} pagination={false} search={true} debug={true}/>

      <h1>Table #3</h1>

      <table id="infoTable" border="0" width="400" height="50">
        <tbody>
          <tr>
            <td>Data:</td>
            <td>local</td>
          </tr>
          <tr>
            <td>Pagination:</td>
              <td className={"enabled"}>enabled</td>
          </tr>
          <tr>
            <td>Search:</td>
            <td className={"enabled"}>enabled</td>
          </tr>
          <tr>
            <td>onClickFunction:</td>
            <td className={"disabled"}>disabled</td>
          </tr>
          <tr>
              <td>Sort on:</td>
              <td>all</td>
          </tr>
        </tbody>
      </table>

      <TableComponent data={dataStore.requestData()} columns={Object.keys(dataStore.requestData()[0])} postsPerPage={5} pagination={true} search={true} debug={true}/> <br></br><br></br>

      <h1>Table #4</h1>

      <table id="infoTable" border="0" width="400" height="50">
        <tbody>
          <tr>
            <td>Data:</td>
            <td>API</td>
          </tr>
          <tr>
            <td>Pagination:</td>
              <td className={"enabled"}>enabled</td>
          </tr>
          <tr>
            <td>Search:</td>
            <td className={"disabled"}>disabled</td>
          </tr>
          <tr>
            <td>onClickFunction:</td>
            <td className={"disabled"}>disabled</td>
          </tr>
          <tr>
              <td>Sort on:</td>
              <td>all</td>
          </tr>
        </tbody>
      </table>

      <TableComponent baseURL={'http://isin03.dti.supsi.ch:81/template/bff/items'}  pagination={true}  postsPerPage={5} search={false} debug={true}/> <br></br><br></br>

      <h1>Table #5</h1>

      <table id="infoTable" border="0" width="400" height="50">
        <tbody>
          <tr>
            <td>Data:</td>
            <td>API</td>
          </tr>
          <tr>
            <td>Pagination:</td>
            <td className={"disabled"}>disabled</td>
          </tr>
          <tr>
            <td>Search:</td>
            <td className={"enabled"}>enabled</td>
          </tr>
          <tr>
            <td>onClickFunction:</td>
            <td className={"enabled"}>enabled</td>
          </tr>
          <tr>
              <td>Sort on:</td>
              <td>all</td>
          </tr>
        </tbody>
      </table>

      <TableComponent baseURL={'http://isin03.dti.supsi.ch:81/template/bff/items'}  columns={["id", "title", "author", "status"]} pagination={false}  search={true} debug={true} onClickFunction={(event, item)=>onClickFunction(event,item)}/>
      <br/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
