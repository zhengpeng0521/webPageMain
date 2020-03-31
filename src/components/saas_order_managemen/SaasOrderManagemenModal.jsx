import React from "react"
import { Table, Popconfirm, Modal, Button, Spin, Icon } from "antd"
import styles from "./SaasOrderstyle.less"
//订购服务
const SaasOrderManagemenModal = ({
  SaasOrderManagemenModalVisible, //表单是否显示
  SaasOrderManagemenModalCancel,
  // saasPackageOpeningLoading,
  SassNameOpenModal
}) => {
  function handleCancel(e) {
    e.preventDefault()
    SaasOrderManagemenModalCancel()
  }
  const columns = [
    {
      width: 80,
      title: "服务名称",
      dataIndex: "serverName",
      key: "serverName"
    },
    {
      width: 50,
      title: "规格",
      dataIndex: "specification",
      key: "specification"
    },
    {
      width: 50,
      title: "服务单价",
      dataIndex: "price",
      key: "price"
    },
    {
      width: 50,
      title: "数量",
      dataIndex: "number",
      key: "number"
    },
    {
      width: 50,
      title: "小计",
      dataIndex: "sumMoney",
      key: "sumMoney"
    }
  ]
  //模态框的属性
  let modalOpts = {
    title: "订购服务",
    // maskClosable: false,
    visible: SaasOrderManagemenModalVisible,
    // closable: true,
    width: 800,
    onCancel: handleCancel,
    className: "saasOrderList",
    footer: []
    // footer: [
    //     <div style={{ marginBottom: '20px' }}><span>合计</span>：¥1233</div>,
    //     <Button key="cancel" type="ghost" size="large" onClick={handleCancel}>取消</Button>,
    //     <Button key="submit" type="primary" size="large">保存</Button>
    // ],
  }
  let num = "合计：¥" + SassNameOpenModal.sumMoney
  return (
    <Modal {...modalOpts}>
      {/* <Spin spinning={saasPackageOpeningLoading}> */}
      <Table
        columns={columns}
        dataSource={SassNameOpenModal.detailItemList}
        pagination={false}
        rowKey="id"
        bordered
        scroll={{ x: 100 }}
        footer={() => num}
      />
      {/* </Spin> */}
    </Modal>
  )
}

export default SaasOrderManagemenModal
