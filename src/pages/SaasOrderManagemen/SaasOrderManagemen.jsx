import React from 'react';
import QueueAnim from 'rc-queue-anim';
import { connect } from 'dva';
import qs from 'qs';
import SaasOrderManagemenSearch from '../../components/saas_order_managemen/SaasOrderManagemenSearch';
import SaasOrderManagemenTable from '../../components/saas_order_managemen/SaasOrderManagemenTable';
import SaasOrderManagemenModal from '../../components/saas_order_managemen/SaasOrderManagemenModal';
import SaasOrderManagemenExamine from '../../components/saas_order_managemen/SaasOrderManagemenExamine';
function SaasOrderManagemen({ dispatch, saasOrderManagemen }) {
    let {
        saasOrdermanageTableData, // 订单table数据
        saasPackageOpeningLoading, //订单table管理列表加载状态
        SaasOrderManagemenModalVisible,
        SaasOrderManagemenVisible,
        // SassNameOpenModalLoading,
        SassNameOpenModal,
        SassNameExamineModal,
        saasPackageOpeningTotal,
        saasPackageOpeningPageIndex,
        saasPackageOpeningPageSize,
        // staunch,
        saasScrmOverViewFreeTrailSearchContent,
        saasPackageOpeningSearchData //搜索栏搜索数据
    } = saasOrderManagemen;
    //搜索栏清空或者提交
    function SearchSubmit(values) {
        dispatch({
            type: 'saasOrderManagemen/hqQueryPkgOrder',
            payload: {
                ...values,
                pageIndex: 0,
                pageSize: 10
            }
        });

        dispatch({
            type: 'saasOrderManagemen/updateState',
            payload: {
                saasPackageOpeningSearchData: values
            }
        });
    }
    function SearchClear() {
        // console.log(saasPackageOpeningSearchData)
        dispatch({
            type: 'saasOrderManagemen/hqQueryPkgOrder',
            payload: {
                pageIndex: 0,
                pageSize: 10,
                saasPackageOpeningSearchData: {},
            }
        });
        dispatch({
            type: 'saasOrderManagemen/updateState',
            payload: {
                saasPackageOpeningSearchData: {},
            }
        });
        // console.log(staunch)
    }
    function CheckIncludeModular(idlist) {
        // console.log(idlist)
        dispatch({
            type: 'saasOrderManagemen/updateState',
            payload: {
                SassNameOpenModal: idlist,
                SaasOrderManagemenModalVisible: true
            }
        });
    }
    function SaasOrderManagemenModalCancel() {
        dispatch({
            type: 'saasOrderManagemen/updateState',
            payload: {
                SaasOrderManagemenModalVisible: false
            }
        });
    }
    function CheckIncludeConir(id) {
        // console.log(id)
        dispatch({
            type: 'saasOrderManagemen/hqQueryPayInfo',
            payload: {
                orderNo: id
            }
        });
    }
    function SaasOrderManagemenExamineCancel() {
        dispatch({
            type: 'saasOrderManagemen/updateState',
            payload: {
                SaasOrderManagemenVisible: false
            }
        });
    }
    function ShowScrmOverViewFreeTrailExport() {
        window.open(`${BASE_URL}/pkgOrder/hqExportPkgOrder?${qs.stringify(saasPackageOpeningSearchData)}`)
    }
    // 审核通过
    function handleYes(order) {
        dispatch({
            type: 'saasOrderManagemen/hqReviewPkgOrder',
            payload: {
                orderNo: order,
                status: 5,
                pageIndex: saasPackageOpeningPageIndex,
                pageSize: saasPackageOpeningPageSize,
                saas: saasPackageOpeningSearchData
            }
        });
    }
    // 审核不通过
    function handleNo(order) {
        dispatch({
            type: 'saasOrderManagemen/hqReviewPkgOrder',
            payload: {
                orderNo: order,
                status: 4,
                pageIndex: saasPackageOpeningPageIndex,
                pageSize: saasPackageOpeningPageSize,
                saas: saasPackageOpeningSearchData
            }
        });
    }
    /*列表分页*/
    let SaasPackageOpeningTableOnChange = function (pagination, filters, sorter) {
        dispatch({
            type: 'saasOrderManagemen/updateState',
            payload: {
                saasPackageOpeningPageIndex: pagination.current - 1,
                saasPackageOpeningPageSize: pagination.pageSize,
            },
        });
        dispatch({
            type: 'saasOrderManagemen/hqQueryPkgOrder',
            payload: {
                pageIndex: pagination.current - 1,
                pageSize: pagination.pageSize,
                ...saasPackageOpeningSearchData
            },
        });
    }
    //搜索栏属性
    let SaasOrderManagemenSearchProps = {
        SearchSubmit,   //搜索栏清空或者提交
        SearchClear,
        saasPackageOpeningSearchData
        // staunch
    };
    //表格数据渲染
    let saasOrderListProps = {
        saasOrdermanageTableData, // 订单table数据
        saasPackageOpeningLoading,//订单table管理列表加载状态
        CheckIncludeModular,
        CheckIncludeConir,
        saasPackageOpeningPageSize,
        saasPackageOpeningPageIndex,
        saasPackageOpeningTotal,
        ShowScrmOverViewFreeTrailExport,
        saasScrmOverViewFreeTrailSearchContent,
        SaasPackageOpeningTableOnChange,
        // staunch
    };
    // 订购服务弹框
    let SaasOrderManagemenModalProps = {
        SaasOrderManagemenModalVisible,
        SaasOrderManagemenModalCancel,
        // saasPackageOpeningLoading,
        SassNameOpenModal,
    }
    // 操作弹框
    let SaasOrderManagemenExamineProps = {
        SaasOrderManagemenVisible,
        SaasOrderManagemenExamineCancel,
        // saasPackageOpeningLoading,
        SassNameExamineModal,
        handleYes,
        handleNo,
        // staunch
    }
    return (
        <div>
            <QueueAnim
                type={['top', 'top']}
                ease={['easeOutQuart', 'easeInOutQuart']}
                className="common-search-queue" >
                <SaasOrderManagemenSearch {...SaasOrderManagemenSearchProps} key="search_queue" />
            </QueueAnim>
            <SaasOrderManagemenTable {...saasOrderListProps} />
            {SaasOrderManagemenVisible ? <SaasOrderManagemenExamine {...SaasOrderManagemenExamineProps} /> : null}
            {SaasOrderManagemenModalVisible ? <SaasOrderManagemenModal {...SaasOrderManagemenModalProps} /> : null}
        </div>
    );
}
function mapStateToProps({ saasOrderManagemen }) {
    return { saasOrderManagemen };
}

export default connect(mapStateToProps)(SaasOrderManagemen);