import React, { Component } from "react";
import RowComponent from "./RowComponent";
import HeaderComponent from "./HeaderComponent";
import SearchComponent from "./SearchComponent";
import "../styles/TableComponent.css";
import axios from "axios";
import LoadingComponent from "./LoadingComponent";
import PaginationComponent from "./PaginationComponent";

class TableComponent extends Component {

  printDebug(msg){
    this.props.debug && console.log("DEBUG: " + msg);
  }

  axiosGet(url){
    return axios.get(url);
  }

  // source: https://stackoverflow.com/questions/1090948/change-url-parameters
  replaceQueryParam(param, paramVal, url){
    var newAdditionalURL = "";
    var tempArray = url.split("?");
    var baseURL = tempArray[0];
    var additionalURL = tempArray[1];
    var temp = "";
    if (additionalURL) {
      tempArray = additionalURL.split("&");
      for (var i=0; i<tempArray.length; i++){
        if(tempArray[i].split('=')[0] !== param){
            newAdditionalURL += temp + tempArray[i];
            temp = "&";
        }
      }
    }
    var rows_txt = temp + "" + param + "=" + paramVal;
    return baseURL + "?" + newAdditionalURL + rows_txt;
  }

  // default proprs - if props are not passed defaults are used
  static defaultProps = {
    postsPerPage: 10,
    pagination: false
  };

  handlePaginate(pageNumber) {

    if (!this.props.baseURL){

      // using local data

      let currentPage = pageNumber;
      let indexOfLastPost = currentPage * this.state.postsPerPage;
      let indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;

      this.setState({
        displayedData: this.state.manipulatedData.slice(indexOfFirstPost, indexOfLastPost),
        currentPage: currentPage,
        indexOfLastPost: indexOfLastPost,
        indexOfFirstPost: indexOfFirstPost,
      });

    } else {

      // using data from API

      this.setState({
        loadingData: true,
      });

      let nextPageURL = this.replaceQueryParam("page", pageNumber, this.state.previousURL)

      this.axiosGet(nextPageURL).then((result) => {
        this.setState({
          displayedData: result.data["content"],
          loadingData: false,
          previousURL: nextPageURL,
          currentPage: pageNumber,
        });
      }).catch((error) => console.log("Error", error));

    }

  }

  constructor(props) {

    super(props);

    this.handleSortTableData = this.handleSortTableData.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handlePaginate = this.handlePaginate.bind(this);

    let currentPage = this.props.baseURL ? 0 : 1

    if (!props.baseURL) {

      // using local data

      let indexOfLastPost = currentPage * props.postsPerPage;
      let indexOfFirstPost = indexOfLastPost - props.postsPerPage;

      this.state = {
        displayedData: this.props.pagination ? props.data.slice(indexOfFirstPost, indexOfLastPost) : props.data,
        manipulatedData: props.data,
        totalPosts: props.data.length,
        columns: props.columns ? props.columns : Object.keys(props.data[0]), // if columns prop is not defined, then use all the columns
        sortColumns : props.sortColumns ? props.sortColumns : (props.columns ? props.columns : Object.keys(props.data[0])), // if sortColumns prop is not defined, then use all the props.columns
        loadingData: false,
        firstPage: 1,
        isFirstRun: true,
        indexOfLastPost: indexOfLastPost,
        indexOfFirstPost: indexOfFirstPost,
        currentPage: currentPage,
        postsPerPage: props.postsPerPage,
      };

    } else {

      // using data from API

      this.state = {
        displayedData: [], // populated in componentDidMount
        manipulatedData: [], // populated in componentDidMount
        totalPosts: 0, // populated in componentDidMount
        columns: [], // populated in componentDidMount
        sortColumns: [],
        loadingData: true,
        firstPage: 0,
        isFirstRun: true,
        previousURL: props.pagination ? props.baseURL + "?size=" + props.postsPerPage + "&page=" + currentPage : props.baseURL,
        currentPage: currentPage,
        postsPerPage: props.postsPerPage,
      };

    }

  }

  componentDidMount() {

    if (this.props.baseURL){

      // using data from API
      // fetch of all elements paginated
      this.axiosGet(this.state.previousURL).then((response)=>{
        this.setState({
          totalPosts: this.props.pagination ? response.data["totalElements"] : 0,
          displayedData: this.props.pagination ? response.data["content"] : response.data,
          columns: this.props.columns ? this.props.columns : ( this.props.pagination ? Object.keys(response.data["content"][0]) : Object.keys(response.data[0])), // if columns prop is not defined, then use all the columns
          sortColumns : this.props.sortColumns ? this.props.sortColumns : (this.props.columns ? this.props.columns : ( this.props.pagination ? Object.keys(response.data["content"][0]) : Object.keys(response.data[0]))), // if sortColumns prop is not defined, then use all the props.columns
          loadingData: false,
          isFirstRun: false
        });
      }).catch((error) => console.log("Error", error));

    }

  }

  renderTableHeader() {
    let headerColumns = Object.keys(this.state.displayedData[0]);
    const columns = headerColumns
      .filter((column) => this.state.columns.includes(column))
      .map((value, index) => (
        <HeaderComponent key={index} value={value} handleSortTableData={this.handleSortTableData}  sortColumns={this.state.sortColumns}/>
      ));
    return <tr>{columns}</tr>;
  }

  handleSortTableData(property, direction) {

    if (!this.props.baseURL) {

      // using local data

      let sort_direction;
      let currentPage = this.state.firstPage;
      let indexOfLastPost = currentPage * this.state.postsPerPage;
      let indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;

      direction === "desc" ? sort_direction = -1 : sort_direction = 1;

      let reorderedData = this.state.manipulatedData;

      reorderedData.sort((a, b) => {
        if (a[property] < b[property]) {
          return -1 * sort_direction;
        } else if (a[property] > b[property]) {
          return 1 * sort_direction;
        } else {
          return 0 * sort_direction;
        }
      });

      // we need to re-slice the data based on user settings (eg postsPerPage)
      reorderedData = reorderedData.slice(indexOfFirstPost, indexOfLastPost)

      this.setState((prevState) => {
        return {
          currentPage: currentPage,
          indexOfFirstPost: indexOfFirstPost,
          indexOfLastPost: indexOfLastPost,    
          displayedData: this.props.pagination ? reorderedData.slice(indexOfFirstPost, indexOfLastPost) : reorderedData,
        };
      });

    } else {

      // using data from API

      this.setState({
        loadingData: true,
      });

      let sortUrl = this.state.previousURL;
      sortUrl = this.replaceQueryParam("sort", property, sortUrl);
      sortUrl = this.replaceQueryParam("direction", direction, sortUrl)
      sortUrl = this.replaceQueryParam("page", this.state.firstPage, sortUrl)

      this.printDebug("sort " + sortUrl);

      this.axiosGet(sortUrl).then((result) => {
        this.setState({
            displayedData: this.props.pagination ? result.data['content'] : result.data,
            loadingData: false,
            previousURL: sortUrl,
            currentPage: this.state.firstPage
        });
      }).catch((error) => console.log("Error", error));
    }

  }

  renderTableData() {
    return this.state.displayedData.map((item, index) => {
      return (
        <RowComponent key={index} item={item} columns={this.state.columns} onClickFunction={this.props.onClickFunction} />
      );
    });
  }

  handleSearch(searchTerm) {

    if (!this.props.baseURL) {

      // using local data

      // use data from props, not from state, otherwise once the data has been filtered it cannot be recovered anymore (overwritten)
      const filteredData = this.props.data.filter((entry) => {
        if (searchTerm.length === 0) {
          return true;
        } else {
          return Object.values(entry).filter((e) => e.toString().includes(searchTerm)).length > 0 ? true : false;
        }
      });

      // we need to re-slice the data based on usäer settings (eg postsPerPage)
      let currentPage = this.state.firstPage;
      let indexOfLastPost = currentPage * this.state.postsPerPage;
      let indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
      let filteredDataSliced = filteredData.slice(this.state.indexOfFirstPost, this.state.indexOfLastPost);

      this.setState({
          displayedData: this.props.pagination ? filteredDataSliced : filteredData,
          manipulatedData: filteredData,
          totalPosts: filteredData.length,
          currentPage: currentPage,
          indexOfFirstPost: indexOfFirstPost,
          indexOfLastPost: indexOfLastPost,
      });

    } else {

      // using data from API

      // display loading
      this.setState({
        loadingData: true,
      });

      let searchUrl = this.state.previousURL;

      searchUrl = this.replaceQueryParam("search", searchTerm, searchUrl);
      searchUrl = this.replaceQueryParam("page", this.props.pagination ? this.state.firstPage : "", searchUrl);

      this.printDebug("search " + searchUrl);

      // fetch current page items
      this.axiosGet(searchUrl).then((response)=>{
        this.setState({
          totalPosts: this.props.pagination ? response.data["totalElements"] : 0,
          displayedData: this.props.pagination ? response.data["content"] : response.data,
          previousURL: searchUrl,
          loadingData: false,
          currentPage: this.state.firstPage
        });
      }).catch((error) => console.log("Error", error));


    }

  }

  renderTable() {
    return (
      <table id="data">
        <thead id="tableHeader">{this.renderTableHeader()}</thead>
        <tbody>
          {this.state.loadingData
            ? this.loadingDataRender(Object.keys(this.state.displayedData[0]).length)
            : this.renderTableData()}
        </tbody>
      </table>
    );
  }

  printData() {
    let dataExist = this.state.displayedData.length > 0 ? true : false;
    return (
      <React.Fragment>
        {dataExist ? (
          this.renderTable()
        ) : (
          <h2 align={"center"}>search resulted in no elements :(</h2>
        )}
      </React.Fragment>
    );
  }

  loadingDataRender(colSpanValue) {
    return (
      <React.Fragment>
        <LoadingComponent colSpanValue={colSpanValue} />
      </React.Fragment>
    );
  }

  render() {
    return (
      <React.Fragment>

        {this.props.search ? (<SearchComponent handleSearch={this.handleSearch} />) : (<></>)}

        {this.state.loadingData && this.state.isFirstRun ? this.loadingDataRender(0) : this.printData()}

        {this.props.pagination ? (
          <PaginationComponent
            currentPage={this.state.currentPage}
            postsPerPage={this.state.postsPerPage}
            totalPosts={this.state.totalPosts}
            paginate={this.handlePaginate}
            firstPage={this.state.firstPage}
          />
        ) : (<></>) }

      </React.Fragment>

    );
  }
}

export default TableComponent;
