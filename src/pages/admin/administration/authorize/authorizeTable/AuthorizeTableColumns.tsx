import type { ColumnsType } from "antd/es/table";
import { Modal, Dropdown } from "antd";
import { ExclamationCircleFilled, DeleteFilled } from "@ant-design/icons";
import MyButton from "src/components/Button";
import { Text } from "src/context/LanguageProvider";
import { MoreOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Link } from "react-router-dom";
import React from "react";
import { DownOutlined } from "@ant-design/icons";
import { Space, Divider, Button, Checkbox } from "antd";

const { confirm } = Modal;

const items = [
  { id: 1, name: "Internship Committee" },
  { id: 2, name: "Department Chair" },
  { id: 3, name: "Executive" },
  { id: 4, name: "Academic" },
];

const showDeleteConfirm = () => {
  confirm({
    title: "Bu yöneticiyi kaldırmak istediğinize emin misiniz?",
    icon: <ExclamationCircleFilled />,
    /*     content: "Some descriptions",
     */ okText: "Kaldır",
    okType: "danger",
    cancelText: "Vazgeç",
    onOk() {
      console.log("OK");
    },
    onCancel() {
      console.log("Cancel");
    },
  });
};
interface DataType {
  key: string;
  name: string;
  surname: string;
  mail: string;
  department: string;
}

export const getColumns = (showModal: any, token: any) => {
  const columns: ColumnsType<DataType> = [
    {
      dataIndex: "key",
      rowScope: "row",
      width: "70px",
    },
    {
      title: "name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "surname",
      dataIndex: "surname",
      key: "surname",
    },

    {
      title: "mail",
      dataIndex: "mail",
      key: "mail",
    },
    {
      title: "department",
      dataIndex: "department",
      key: "department",
    },
    {
      key: "actions",
      fixed: "right",
      render: (_, record) => {
        const items: MenuProps["items"] = [
          {
            label: (
              <span onClick={() => showModal(record, 1)}>
                Internship Committee
              </span>
            ),
            key: "1",
          },
          {
            label: (
              <span onClick={() => showModal(record, 2)}>Department Chair</span>
            ),
            key: "2",
          },
          {
            label: <span onClick={() => showModal(record, 3)}>Executive</span>,
            key: "3",
          },
          {
            label: <span onClick={() => showModal(record, 4)}>Academic</span>,
            key: "4",
          },
        ];
        const contentStyle: React.CSSProperties = {
          backgroundColor: token.colorBgElevated,
          borderRadius: token.borderRadiusLG,
          boxShadow: token.boxShadowSecondary,
        };

        const menuStyle: React.CSSProperties = {
          boxShadow: "none",
        };
        return (
          <Dropdown
            menu={{ items }}
            placement="bottomRight"
            trigger={["click"]}
            dropdownRender={(menu) => (
              <div style={contentStyle}>
                {React.cloneElement(menu as React.ReactElement, {
                  style: menuStyle,
                })}
                <Divider style={{ margin: 0 }} />

                {items.map((item) => (
                  <div
                    key={item?.key}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "8px",
                    }}
                  >
                    <Checkbox />
                    elma
                  </div>
                ))}

                <Space style={{ padding: 8 }}>
                  <Button type="primary">Click me!</Button>
                </Space>
              </div>
            )}
          >
            <MyButton icon={<MoreOutlined />} type="text" />
          </Dropdown>
        );
      },
    },
  ];
  return columns;
};
