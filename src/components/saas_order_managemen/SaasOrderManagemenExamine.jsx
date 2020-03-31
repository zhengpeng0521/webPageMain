import React from "react"
import { Table, Popconfirm, Modal, Button, Spin, Icon } from "antd"
import styles from "./SaasOrderstyle.less"

//域名审核
const SaasOrderManagemenModal = ({
  SaasOrderManagemenVisible, //表单是否显示
  SaasOrderManagemenExamineCancel,
  // saasPackageOpeningLoading,
  SassNameExamineModal,
  handleNo,
  handleYes
}) => {
  function handleCancel(e) {
    e.preventDefault()
    SaasOrderManagemenExamineCancel()
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
      dataIndex: "payMoney",
      key: "payMoney"
    }
  ]
  //模态框的属性
  let modalOpts = {
    title: "转账审核",
    maskClosable: false,
    visible: SaasOrderManagemenVisible,
    closable: true,
    width: 600,
    onCancel: handleCancel,
    className: "saasOrderList",
    footer: [
      <div key="botline" className={styles.botline}></div>,
      <div key="botwrap" className={styles.botwrap}>
        <Button key="cancel" type="ghost" size="large" onClick={handleCancel}>
          取消
        </Button>
        <Button
          key="nosubmit"
          type="ghost"
          size="large"
          onClick={() => handleNo(SassNameExamineModal.orderNo)}>
          审核不通过
        </Button>
        <Button
          key="submit"
          type="primary"
          size="large"
          onClick={() => handleYes(SassNameExamineModal.orderNo)}>
          审核通过
        </Button>
      </div>
    ]
  }
  // 自定义合计
  let num = "合计：¥" + SassNameExamineModal.sumMoney
  return (
    <Modal {...modalOpts}>
      {/* <Spin spinning={saasPackageOpeningLoading}> */}
      <div className={styles.felxbox}>
        <span className={styles.lines}></span>
        <span className={styles.payMain}>付款方信息</span>
      </div>
      <div className={styles.boxright}>
        <span>付款人户名:</span>
        <span className={styles.botcon}>
          {SassNameExamineModal.payerAccountName}
        </span>
      </div>
      <div
        className={styles.boxright}
        style={{ marginTop: "14px", marginBottom: "14px" }}>
        <span>开户行:</span>
        <span className={styles.botcon}>{SassNameExamineModal.payerBank}</span>
      </div>
      <div className={styles.boxright}>
        <span>付款人账号:</span>
        <span className={styles.botcon}>
          {SassNameExamineModal.payerAccountNumber}
        </span>
      </div>
      <div className={styles.felxbox} style={{ marginTop: "20px" }}>
        <span className={styles.lines}></span>
        <span className={styles.payMain}>订购服务</span>
      </div>
      <div className={styles.boxright} style={{ marginBottom: "14px" }}>
        <span>机构名称:</span>
        <span className={styles.botcon}>{SassNameExamineModal.orgName}</span>
      </div>
      <Table
        columns={columns}
        dataSource={SassNameExamineModal.detailItemList}
        pagination={false}
        bordered
        rowKey="id"
        scroll={{ x: 100 }}
        footer={() => num}
      />
      <div className={styles.felxbox} style={{ marginTop: "18px" }}>
        <span className={styles.lines}></span>
        <span className={styles.payMain}>订购人</span>
      </div>
      <div className={styles.boxright} style={{ marginBottom: "20px" }}>
        <span style={{ marginLeft: "25px" }}>订购人:</span>
        <span className={styles.botcon}>{SassNameExamineModal.purchaser}</span>
      </div>

      <div className={styles.boxright}>
        <span>订购人电话:</span>
        <span className={styles.botcon}>
          {SassNameExamineModal.purchaserTel}
        </span>
      </div>
      {/* </Spin> */}
    </Modal>
  )
}

export default SaasOrderManagemenModal
