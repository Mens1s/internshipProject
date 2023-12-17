import type { ColumnsType } from "antd/es/table";
import { Modal, Dropdown } from "antd";
import { ExclamationCircleFilled, DeleteFilled } from "@ant-design/icons";
import MyButton from "src/components/Button";
import { Text } from "src/context/LanguageProvider";
import { MoreOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Link } from "react-router-dom";

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

export const getColumns = (showModal: any) => {
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
              <span onClick={() => showModal(record)}>
                Internship Committee
              </span>
            ),
            key: "1",
          },
          {
            label: (
              <span onClick={() => showModal(record)}>Department Chair</span>
            ),
            key: "2",
          },
          {
            label: <span onClick={() => showModal(record)}>Executive</span>,
            key: "3",
          },
          {
            label: <span onClick={() => showModal(record)}>Academic</span>,
            key: "4",
          },
        ];
        return (
          <Dropdown
            menu={{ items }}
            placement="bottomRight"
            trigger={["click"]}
          >
            <MyButton icon={<MoreOutlined />} type="text" />
          </Dropdown>
        );
      },
      /*  render: (_, record) => (
        <MyButton
        text={<Text tid="remove" />}
        icon={<DeleteFilled />}
        onClick={showDeleteConfirm}
        type="primary"
        danger
      /> 
    ), */
    },
  ];
  return columns;
};
