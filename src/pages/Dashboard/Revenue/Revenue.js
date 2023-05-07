import axios from "axios";
import React, { PureComponent } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export default class Revenue extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { revenue: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8080/api/admin/revenue")
      .then((res) => {
        this.setState({ revenue: res.data });
      })
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <BarChart
        width={800}
        height={400}
        data={this.state.revenue}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="_id" padding={{ left: 20, right: 20 }} />
        <YAxis />
        <Tooltip />
        <Bar dataKey="revenue" fill="#8884d8" />
      </BarChart>
    );
  }
}
