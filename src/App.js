import React, { Component } from 'react';
import axios from 'axios';
// import data from './data.json'

// var PRODUCTS = data.items
// var products = []

// var products = [
//   {name: 'items', description: '1', owner: 'liuhui', stars: '11'},
//   {name: 'items22', description: '22', owner: 'liuhui22', stars: '22'},
//   {name: 'items33', description: '33', owner: 'liuhui33', stars: '33'},
//   {name: 'items44', description: '44', owner: 'liuhui44', stars: '44'},
// ];

// FilterableProductTable 包含挣个示例
// SearchBar 接受所有的用户输入
// ProductTable 根据用户输入显示和过滤数据集合
// ProductCategoryRow 显示每个类别的标题
// ProductRow 显示每个产品的行数据

class ProductRow extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.product.name}</td>
        <td>{this.props.product.description}</td>
        <td>{this.props.product.owner}</td>
        <td>{this.props.product.stars}</td>
      </tr>
    );
  }
}

class ProductTable extends React.Component {
  render () {
    var rows = [];
    if (this.props.products !== undefined) {
      this.props.products.forEach(product => {
        rows.push(<ProductRow product={product} key={product.name} />)
      });
    }
    return (
      <table>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {
  constructor (props) {
    super(props);
    this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this);
  }

  handleFilterTextInputChange(e) {
    this.props.onFilterTextInput(e.target.value);
    axios.get(`https://api.github.com/search/repositories?q=${e.target.value}`)

      .then(res => {
        // console.log(res.data.items)

        const products = res.data.items
        console.log(products)

        this.setState({ products });

      });
  }



  render () {
    return (
      <form>
        <input 
          type="text" 
          placeholder="Search..." 
          value={this.props.filterText} 
          onChange={this.handleFilterTextInputChange}
        />
      </form>
    )
  }
}

class FilterableProductTable extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      filterText: '',
      products: [
        {name: 'items', description: '1', owner: 'liuhui', stars: '11'},
        {name: 'items22', description: '22', owner: 'liuhui22', stars: '22'},
        {name: 'items33', description: '33', owner: 'liuhui33', stars: '33'},
        {name: 'items44', description: '44', owner: 'liuhui44', stars: '44'},
      ]
    }
    this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
  }

  handleFilterTextInput (filterText) {
    this.setState({
      filterText: filterText
    });
  }



  render () {
    return (
      <div>
        <SearchBar 
          filterText={this.state.filterText}
          onFilterTextInput={this.handleFilterTextInput}
        />
        <ProductTable 
          products={this.props.products} 
          filterText={this.state.filterText}
        />
      </div>
    )
  }
}


class App extends Component {
  render() {
    return (
      <div>
        <FilterableProductTable />
      </div>
    );
  }
}


export default App;
