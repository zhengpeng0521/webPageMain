import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Icon, Tooltip, Popover } from 'antd';
import style from './HomePagePopover.less'

//saas营销首页首页弹窗管理
function homePagePopoverTable({
    homePagePopoverTableIndex,                //首页弹窗管理页码
    homePagePopoverTableIPageSize,            //首页弹窗管理每页条数
    homePagePopoverTableIData,                //首页弹窗管理管理列表数据
    homePagePopoverTableIDataTotal,           //首页弹窗管理管理列表条数
    homePagePopoverTableILoading,             //首页弹窗管理管理列表加载状态

    AddOrEditPopover,                         //新增首页弹窗
    HomePagePopoverOnChange,                  //首页弹窗管理列表状态改变(分页等)
    HomePagePopoverChangeStatus,             //首页弹窗改变上下架状态
}) {

   let homeTitle = (<div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
        排序
    <Popover content="排序值越大排在越前面">
        <span style={{margin:'3px 0 0 5px',cursor:'pointer'}}><Icon type="exclamation-circle" /></span>
    </Popover>
    </div>)

  const columns = [{
    width: 125,
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },{
    width: 100,
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render:(text,record) => (
        <div>
            {
            '0' == text ?
                (<sapn className={style.check}>已下架</sapn>)
            :
            '1' == text ?
                (<sapn>已上架</sapn>):'未指定'
            }
        </div>
    )
  }, {
    width: 150,
    title: '弹框图片',
    dataIndex: 'image',
    key: 'image',
    render: (text, record) => (
        <div>
            { text != undefined && text != '' && text != null ?　<img src={text} width="100px" height="80px"/>　: '无' }
        </div>
    ),
  }, {
    width: 250,
    title: '外链',
    dataIndex: 'link',
    key: 'link',
  },{
    width: 125,
    title: homeTitle,
    dataIndex: 'sort',
    key: 'sort',
  },{
     width: 125,
     title: '频次',
     dataIndex: 'frequency',
     key: 'frequency',
     render: (text, record) => (
        <div>
            {
                 text == '0' ? '总共弹一次'
                 :
                 text == '1' ? '每天弹一次'
				 :
                 ''
            }
        </div>
     ),
  },  {
    width: 180,
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    render:(text,record) => (
        <div>
            {/* 编辑 */}
            <a className={style.check} onClick={() => AddOrEditPopover('edit',record)}>编辑</a>

            {/* 上下架 */}
            <span style={{marginLeft: '10px'}}>
				{
				record.status == '0' ?
						(<Popconfirm title={<p>确定设置<strong style={{color:'red'}}>上架</strong>吗?</p>} onConfirm={() => HomePagePopoverChangeStatus('updown', record)}>
								<a className={style.check}>上架</a>
						 </Popconfirm>)
				:
				record.status == '1' ?
						(<Popconfirm title={<p>确定设置<strong style={{color:'#77c8f8'}}>下架</strong>吗?</p>} onConfirm={() => HomePagePopoverChangeStatus('updown', record)}>
								<a style={{color:'red'}}>下架</a>
						 </Popconfirm>):'未指定'
				}
		    </span>

            {/* 删除 */}
            <a className={style.check} onClick={() => HomePagePopoverChangeStatus('delete', record)} style={{marginLeft: '10px'}}>删除</a>
        </div>
    )
  }];

	let paginationProps = {
        current : homePagePopoverTableIndex + 1,
        pageSize : homePagePopoverTableIPageSize,
        total: homePagePopoverTableIDataTotal,
        showSizeChanger: true,
        showQuickJumper :true,
        showTotal(){
            return '总共'+this.total+'条数据';
        }
    };

    let list = [];
    for(let i = 0 ; i < 20 ; i ++ ){
        list.push({
            status : i,
            image : 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3518769679,775197924&fm=23&gp=0.jpg',
            link : 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3518769679,775197924&fm=23&gp=0.jpg',
        });
    }

    return (
        <div className="table-bg">
            <div className="common-over">
                <div className="common-left" style={{width : '60%'}}>
                    <div className="table-handle" key="table-handle">
                    </div>
                </div>
                <div className="common-right" style={{width : '40%'}}>
                    <div className="table-operations" >
                        <Button type="primary" onClick={() => AddOrEditPopover('add')}><Icon type="plus" />新增</Button>
                    </div>
                </div>
            </div>
            <Table
                columns={columns}
                dataSource={homePagePopoverTableIData}
                loading={homePagePopoverTableILoading}
                pagination={paginationProps}
                onChange={HomePagePopoverOnChange}
                bordered
                rowKey="id"
                scroll={{ x : 1000 }} />
        </div>
    );
}

export default homePagePopoverTable;
