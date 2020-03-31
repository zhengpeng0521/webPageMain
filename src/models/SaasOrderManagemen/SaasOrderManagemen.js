import { parse } from 'qs';
import { message } from 'antd';
import { hqQueryPkgOrder, hqQueryDetail, hqReviewPkgOrder, hqQueryPayInfo, hqExportPkgOrder } from '../../services/SaasOrderManagment/SaasOrderManagment'
//实例管理
export default {
    namespace: 'saasOrderManagemen',
    state: {
        // 订购服务开关
        SaasOrderManagemenModalVisible: false,
        // 转账审核开关
        SaasOrderManagemenVisible: false,
        // // 订购服务弹框loading
        // SassNameOpenModalLoading: false,
        // 订购服务弹框数据
        SassNameOpenModal: [],
        // 转账审核弹框数据
        SassNameExamineModal: [],
        // 订单表格数据
        saasOrdermanageTableData: [], // 订单table数据
        saasPackageOpeningTotal: "",
        saasPackageOpeningPageIndex: "",
        saasPackageOpeningPageSize: "",
        saasPackageOpeningLoading: false, // 加载动画
        saasPackageOpeningSearchData: {}, //导出数据
        // staunch: '', // 审核的状态
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                // console.log(location)
                if (location.pathname == '/saas_order_managemen') {
                    /*获取套餐开通列表*/
                    dispatch({
                        type: 'hqQueryPkgOrder',
                        payload: {
                            pageIndex: 0,
                            pageSize: 10,
                            status: 3
                        }
                    });
                    dispatch({
                        type: 'updateState',
                        payload: {
                            saasPackageOpeningSearchData: { status: 3 }
                        }
                    });
                }
            });
        }
    },
    effects: {
        /*获取订单列表*/
        *'hqQueryPkgOrder'({ payload }, { put, call, select }) {
            yield put({ type: 'showTableLoading' });
            let { ret } = yield call(hqQueryPkgOrder, parse(payload));
            if (ret && ret.errorCode === 9000 || ret.errorCode === 0) {
                yield put({
                    type: 'updateState',
                    payload: {
                        saasOrdermanageTableData: ret.results,
                        saasPackageOpeningTotal: ret.data.resultCount,
                        saasPackageOpeningPageIndex: ret.data.pageIndex || 0,
                        saasPackageOpeningPageSize: ret.data.pageSize || 10
                    }
                });
            } else {
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }
            yield put({ type: 'closeModularLoading' });
        },
        // 转账审核
        *'hqQueryPayInfo'({ payload }, { put, call, select }) {
            yield put({ type: 'payinfoshow' });
            yield put({ type: 'showTableLoading' });
            let { ret } = yield call(hqQueryPayInfo, parse(payload));
            // console.log(ret)
            if (ret && ret.errorCode === 9000 || ret.errorCode === 0) {
                // console.log(ret.results)
                yield put({
                    type: 'updateState',
                    payload: {
                        SassNameExamineModal: ret.payInfo
                    }
                })
            } else {
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }
            yield put({ type: 'closeModularLoading' });
        },
        // 审核和不审核
        *'hqReviewPkgOrder'({ payload }, { put, call, select }) {
            console.log(payload)
            let datas = {
                orderNo: payload.orderNo,
                status: payload.status
            }
            let { ret } = yield call(hqReviewPkgOrder, parse(datas));
            if (ret && ret.errorCode === 9000 || ret.errorCode === 0) {
                yield put({
                    type: 'updateState',
                    payload: {
                        SaasOrderManagemenVisible: false
                    }
                });

                yield put({
                    type: 'hqQueryPkgOrder',
                    payload: {
                        pageIndex: payload.pageIndex,
                        pageSize: payload.pageSize,
                        ...payload.saas
                    }
                });

                ret && ret.errorMessage && message.success(ret.errorMessage);
            } else {
                ret && ret.errorMessage && message.error(ret.errorMessage);
                // yield put({
                //     type: 'updateState',
                //     payload: {
                //         SaasOrderManagemenVisible: false
                //     }
                // });
            }
        }
        // // 订购服务
        // *'hqQueryDetail'({ payload }, { put, call, select }) {
        //     yield put({ type: 'QueryDetail' });
        //     yield put({ type: 'showTableLoading' });
        //     let { ret } = yield call(hqQueryDetail, parse(payload));
        //     console.log(ret)
        //     if (ret && ret.errorCode === 9000) {
        //         // console.log(ret.results)
        //         yield put({
        //             type: 'updateState',
        //             payload: {
        //                 SassNameOpenModal: ret.orderInfo
        //             }
        //         });
        //     } else {
        //         ret && ret.errorMessage && message.error(ret.errorMessage);
        //     }
        //     yield put({ type: 'closeModularLoading' });
        // },

    },
    reducers: {
        updateState(state, action) {
            return { ...state, ...action.payload };
        },
        /*订单列表加载中*/
        showTableLoading(state, action) {
            return { ...state, ...action.payload, saasPackageOpeningLoading: true };
        },
        /*订单列表加载中取消*/
        closeModularLoading(state, action) {
            return { ...state, ...action.payload, saasPackageOpeningLoading: false };
        },
        // 转账审核显示
        payinfoshow(state, action) {
            return { ...state, ...action.payload, SaasOrderManagemenVisible: true };
        },
        // // 订购服务显示
        // QueryDetail(state, action) {
        //     return { ...state, ...action.payload, SaasOrderManagemenModalVisible: true };
        // },
    }
}