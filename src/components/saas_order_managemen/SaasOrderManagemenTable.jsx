import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Icon } from 'antd';
function SaasOrderManagemenTable({
    saasOrdermanageTableData,        //订单管理列表数据
    saasPackageOpeningLoading,          //套餐管理列表加载状态
    CheckIncludeModular,//弹窗事件
    CheckIncludeConir,
    saasPackageOpeningPageSize,
    saasPackageOpeningPageIndex,
    saasPackageOpeningTotal,
    ShowScrmOverViewFreeTrailExport,
    SaasPackageOpeningTableOnChange
}) {
    const columns = [{
        width: 150,
        title: '订单号',
        dataIndex: 'orderNo',
        key: 'orderNo'
    }, {
        width: 85,
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (text, record) => {
            if (text == 0) {
                return (
                    <div className="connsed"><span style={{ background: '#F5A623' }}></span>待支付</div>
                )
            }
            if (text == 1) {
                return (
                    <div className="connsed"><span style={{ background: '#DDDDDD' }}></span>订单已取消</div>
                )
            }
            if (text == 2) {
                return (
                    <div className="connsed"><span style={{ background: '#DDDDDD' }}></span>订单已过期</div>
                )
            }
            if (text == 3) {
                return (
                    <div className="connsed"><span style={{ background: '#5D9CEC' }}></span>待审核</div>
                )
            }
            if (text == 4) {
                return (
                    <div className="connsed"><span style={{ background: '#D0031B' }}></span>审核未通过</div>
                )
            }
            if (text == 5) {
                return (
                    <div className="connsed"><span style={{ background: '#88C70A' }}></span>订购成功</div>
                )

            }
        }
    }, {
        width: 105,
        title: '机构名称',
        dataIndex: 'orgName',
        key: 'orgName',
    }, {
        width: 75,
        title: '机构ID',
        dataIndex: 'orgId',
        key: 'orgId',
    }, {
        width: 180,
        title: '订购服务',
        dataIndex: 'pkgServerName',
        key: 'pkgServerName',
        render: (text, record) => (
            <div>
                <a style={{ color: '#629EF1' }} onClick={() => CheckIncludeModular(record)}>{text}</a>
            </div>
        )
    }, {
        width: 200,
        title: '订购时间',
        dataIndex: 'createTime',
        key: 'createTime'
        // render: (text, record) => {
        //     if (record.buyTime == null) {
        //         return (
        //             <div>无</div>
        //         )
        //     } else {
        //         return (
        //             <div>{text}</div>
        //         )
        //     }
        // }

    }, {
        width: 75,
        title: '操作',
        render: (text, record) => {
            if (record.status == 3) {
                return (
                    <a style={{ color: '#629EF1' }} onClick={() => CheckIncludeConir(record.orderNo)}>转账审核</a>
                )
            } else {
                return (
                    <span>无</span>
                )
            }
        }
    }];
    let paginationProps = {
        current: saasPackageOpeningPageIndex + 1,
        pageSize: saasPackageOpeningPageSize,
        total: saasPackageOpeningTotal,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal() {
            return '总共' + this.total + '条数据';
        }
    };
    return (
        <div className="table-bg">
            <div className="common-over">
                <div className="common-left" style={{ width: '60%' }}>
                    <div className="table-handle" key="table-handle">
                        {/* <Button type="primary" ><Icon type="export" />按查询结果导出</Button> */}
                    </div>
                </div>
                <div className="common-right" style={{ width: '40%' }}>
                    <div className="table-operations" >
                        <Button type="primary" onClick={() => ShowScrmOverViewFreeTrailExport()}><Icon type="export" />按查询结果导出</Button>
                    </div>
                </div>
            </div>
            <Table
                columns={columns}
                dataSource={saasOrdermanageTableData}
                loading={saasPackageOpeningLoading}
                pagination={paginationProps}
                onChange={SaasPackageOpeningTableOnChange}
                bordered
                rowKey="id"
                scroll={{ x: 1000 }} />
        </div>
    );
}
export default SaasOrderManagemenTable;