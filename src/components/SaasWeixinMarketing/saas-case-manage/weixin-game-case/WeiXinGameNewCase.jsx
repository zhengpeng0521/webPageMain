import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Icon } from 'antd';
import style from './WeiXinGameCase.less'

function WeiXinGameCaseList({
    weiXinGameNewCasePageSize,              //微信游戏页面数据数量
    weiXinGameNewCasePageIndex,             //微信游戏页码
    weiXinGameCaseLoading,                  //列表是否加载状态
    weiXinGameNewCaseList,                  //新版微信游戏列表数据
    weiXinGameNewCaseTotal,                 //新版微信游戏列表数据总数

    OpenPreviewModal,                       //列表点击预览
    WeiXinGameNewFilter,                    //点击筛选
    WeiXinGameNewCasePageChange,            //分页筛选分类信息改变
    WeiXinGameNewExportList,                //按查询结果导出
  }) {
  const columns = [{
    width: 100,
    title: '编号',
    dataIndex: 'instId',
    key: 'instId',
  }, {
    width: 80,
    title: '预览',
    dataIndex: 'preview',
    key: 'preview',
    render:(text,record) => (
        <a className={style.check} onClick={() => OpenPreviewModal(record,'newGame')}>预览</a>
    ),
  }, {
    width: 70,
    title: '状态',
    dataIndex: 'instStatus',
    key: 'instStatus',
    render:(text,record) => (
        <div>
            { '0' == text ? '待发布' :
              '3' == text ? '已结束' :
              '1' == text ? '未开始' :
              '2' == text ? '进行中' : '未指定'
            }
        </div>
    ),
  }, {
    width: 70,
    title: '删除状态',
    dataIndex: 'status',
    key: 'status',
    render:(text,record) => (
        <div>
            { '0' == text ? '已删除' : '未指定' }
        </div>
    ),
  },{
    width: 100,
    title: '实例名称',
    dataIndex: 'title',
    key: 'title',
  }, {
    width: 100,
    title: '模板名称',
    dataIndex: 'modelName',
    key: 'modelName',
  }, {
    width: 120,
    title: '机构名称',
    dataIndex: 'orgName',
    key: 'orgName',
  }, {
    width:70,
    title:'租户ID',
    dataIndex:'tenantId',
    key:'tenantId',
  },  {
    width: 70,
    title:'机构ID',
    dataIndex:'orgId',
    key:'orgId',
  }, {
    width: 100,
    title: '联系方式',
    dataIndex: 'tel',
    key: 'tel',
  }, {
    width: 100,
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
  }, {
    width: 70,
    title: '浏览数',
    dataIndex: 'views',
    key: 'views',
    sorter : true,
  }, {
    width: 70,
    title: '报名数',
    dataIndex: 'amount',
    key: 'amount',
    sorter : true,
  }, {
    width: 70,
    title: '分享数',
    dataIndex: 'shares',
    key: 'shares',
    sorter : true,
  }];

	let paginationProps = {
        current : weiXinGameNewCasePageIndex + 1,
        pageSize : weiXinGameNewCasePageSize,
        total: weiXinGameNewCaseTotal,
        showSizeChanger: true,
        showQuickJumper :true,
        showTotal(){
            return '总共'+this.total+'条数据';
        }
    };

    return (
        <div className="table-bg">
            <div className="common-over">
                <div className="common-left" style={{width : '60%'}}>

                <div className="table-handle" key="table-handle">
                    <Button type="primary" onClick={WeiXinGameNewExportList}><Icon type="export" />按查询结果导出</Button>
                </div>

                </div>
                <div className="common-right" style={{width : '40%'}}>
                    <div className="table-operations" >
                        <Button type="primary" onClick={WeiXinGameNewFilter}><Icon type="filter" />筛选</Button>
                    </div>
                </div>
            </div>
            <Table
                columns={columns}
                dataSource={weiXinGameNewCaseList}
                loading={weiXinGameCaseLoading}
                pagination={paginationProps}
                onChange={WeiXinGameNewCasePageChange}
                bordered
                rowKey="instId"
                scroll={{ x : 1000 }} />
        </div>
  );
}


export default WeiXinGameCaseList;
