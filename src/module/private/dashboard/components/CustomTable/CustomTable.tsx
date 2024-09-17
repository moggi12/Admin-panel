import { Table, TableProps } from "antd";
import React from "react";
import "./CustomTable.less";

export default function CustomTable(props: TableProps<any>) {
  return (
    <Table
      {...props}
      className={`io-table table table-responsive ${props.className}`}
      columns={props.columns}
      dataSource={props.dataSource}
      pagination={{
        ...props.pagination,
        position: ["bottomCenter"],
        showSizeChanger: false,
      }}
    />
  );
}
