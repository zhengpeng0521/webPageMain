import React, { PropTypes } from 'react';
import { Tabs, Icon, message } from 'antd';
import QueueAnim from 'rc-queue-anim';
import { connect } from 'dva';
import qs from 'qs';

/*Saas模块管理*/
import SaasModularManageList from '../../components/SaasPackageManage/saas-modular-manage/SaasModularManage';
import SaasModularManageAddOrEditModular from '../../components/SaasPackageManage/saas-modular-manage/SaasModularManageAddOrEditModular';

/*Saas套餐管理*/
import SaasPackageManageSearch from '../../components/SaasPackageManage/saas-package-manage/SaasPackageManageSearch';
import SaasPackageManageTable from '../../components/SaasPackageManage/saas-package-manage/SaasPackageManageTable';
import SaasPackageCheckIncludeModularModal from '../../components/SaasPackageManage/saas-package-manage/SaasPackageCheckIncludeModularModal';
import SaasPackageManageAddOrEditModal from '../../components/SaasPackageManage/saas-package-manage/SaasPackageManageAddOrEditModal';

/*Saas套餐开通*/
import SaasPackageOpeningSearch from '../../components/SaasPackageManage/saas-package-opening/SaasPackageOpeningSearch';
import SaasPackageOpeningTable from '../../components/SaasPackageManage/saas-package-opening/SaasPackageOpeningTable';
import SaasPackageOpeningModal from '../../components/SaasPackageManage/saas-package-opening/SaasPackageOpeningModal';

//*Saas营销模块
import MarketingPackageList from '../../components/SaasWeixinMarketing/saas-weixin-market-marketing-package/MarketingPackageList';
import MarketingPackageSearch from '../../components/SaasWeixinMarketing/saas-weixin-market-marketing-package/MarketingPackageSearch';
import MarketingPackageCheckModalNoModal from '../../components/SaasWeixinMarketing/saas-weixin-market-marketing-package/MarketingPackageCheckModalNoModal';
import MarketingPackageAddOrEditModal from '../../components/SaasWeixinMarketing/saas-weixin-market-marketing-package/MarketingPackageAddOrEditModal';
const TabPane = Tabs.TabPane;

function SaasPackageManage({ dispatch, saasPackageManage }) {

    let {
        //*Saas营销模块
        attrDataLimit,
        searchVisible,                      //搜索框是否显示
        searchData,
        isSelectAllLimitNum,
        isSelectAllLimit,
        isSelectAllChartBox,
        selectLimitNumBoxNum,
        selectChartBoxNum,
        allPrivilegeNum,
        selectedRowKeys,

        pageSize,                           //每页展示条目数
        pageIndex,                          //页码
        loading,                            //列表是否加载
        total,                              //列表总数
        list,                               //列表内容

        checkModalVisible,                  //点击'包含模版'下内容是弹窗是否显示
        checkModalContent,                  //点击'包含模版'获取到的值
        checkModalNoDefaultExpandedKeys,    //查看模板数量默认树状展示
        checkModalNoDefaultExpandedKeysleft,
        addOrEditFormType,                  //新增编辑modal 'create'/'edit'
        addOrEditFormVisible,               //新增编辑modal是否显示
        addOrEditButtonLoading,             //新增编辑modal提交时按钮是否加载中
        addOrEditFormData,                  //编辑表单是带出的表单默认内容
        addOrEditFormActivityTransferAllContent,        //微信活动穿梭框左边传单内容
        addOrEditFormActivityTransferTargetContent,     //微信活动穿梭框右边传单内容
        addOrEditFormAdminiTransferAllContent,        //微信活动穿梭框左边传单内容-----------------------------------
        addOrEditFormAdminiTransferTargetContent,     //微信活动穿梭框右边传单内容----------------------------------
        addOrEditFormGameTransferAllContent,            //微信游戏穿梭框左边传单内容
        gameModuleFilterKeyWord,
        selectData,
        addOrEditFormGameTransferTargetContent,         //微信游戏穿梭框右边传单内容
        addOrEditFormOfflineLeafletsTransferAllContent,	//线下传单穿梭框左边传单内容
        addOrEditFormOfflineLeafletsTransferTargetContent, //线下传单穿梭框右边传单内容

        selectedLimitY,//已选限制
        selectedLimitN,//已选不限制
        numValue,
        selectedChart,
        text,
        chartLimit,
        stateVue,

        /*Saas模块管理*/
        /*模块列表*/
        modularResType,                             //模块类型(1机构/2总部)
        modularListLoading,                         //模块列表加载状态
        allModularList,                             //模块列表数据
        wetherSelectModularItem,                    //选中模块的索引项
        modularSelectedProps,                       //选中的模块所拥有的属性

        /*新增编辑模块modal*/
        addOrEditSaasModularModalType,              //模块管理新增修改类型('add'/'edit')
        addOrEditSaasModularModalVisible,           //模块管理modal是否显示
        addOrEditSaasModularModalData,              //模块管理编辑时回填数据
        addOrEditSaasModularButtonLoading,          //模块管理按钮是否加载状态

        /*菜单列表*/
        menuListLoading,                            //菜单加载状态
        allMenuList,                                //菜单列表内容
        menuCheckedArray,                           //选中的菜单
        secondListArray,                            //打开的树结构(默认是二级菜单)

        /*Saas套餐管理*/
        /*套餐管理搜索栏*/
        saasPackageManageSearchVisible,             //搜索栏是否展示
        saasPackageManageSearchData,                //搜索栏搜索数据

        /*套餐管理列表*/
        saasPackageManagePageIndex,                 //套餐页码
        saasPackageManagePageSize,                  //套餐每页条数
        saasPackageManageTableData,                 //套餐管理列表数据
        saasPackageManagetotal,                     //套餐管理列表条数
        saasPackageManageLoading,                   //套餐管理列表加载状态

        /*查看套餐包含模块*/
        saasPackageCheckVisible,                    //查看包含模块modal显示
        saasPackageCheckIncludeData,                //查看包含模块数据
        checkModalContentData,

        /*套餐管理新增编辑套餐*/
        addOrEditSaasPackageModalType,              //套餐管理新增修改类型('add'/'edit')
        addOrEditSaasPackageModalVisible,           //套餐管理modal是否显示
        addOrEditSaasPackageModalData,              //套餐管理编辑时回填数据
        addOrEditSaasPackageButtonLoading,          //套餐管理按钮是否加载状态
        addOrEditSaasPackageransferAllContent,      //穿梭框内所有模板的值
        addOrEditSaasPackageTransferTargetContent,  //穿梭框所选中的模板
        moduleName,      //选中的名字
        selectPackage,                              // 选中的数组
        /*Saas套餐开通*/
        /*套餐开通搜索栏*/
        saasPackageOpeningSearchVisible,            //搜索栏是否展示
        saasPackageOpeningSearchData,               //搜索栏搜索数据

        /*套餐开通列表*/
        saasPackageOpeningPageIndex,                //套餐页码
        saasPackageOpeningPageSize,                 //套餐每页条数
        saasPackageOpeningTableData,                //套餐管理列表数据
        saasPackageOpeningTotal,                    //套餐管理列表条数
        saasPackageOpeningLoading,                  //套餐管理列表加载状态

        /*套餐开通表单*/
        saasPackageOpeningModalVisible,                 //modal是否显示
        saasPackageOpeningModalButtonLoading,           //modal按钮是否在加载状态
        saasPackageOpeningModalSelectContent,           //套餐列表数据
        saasPackageOpeningModalSearchType,              //机构搜索方式(0按机构和机构手机号/1按租户查询)
        saasPackageOpeningModalTenantSelectVisible,     //租户下拉列表是否显示(搜素租户之后才显示)
        saasPackageOpeningModalTenantSelectContent,     //租户下拉列表数据
        saasPackageOpeningModalOrgArray,                //接口获取的机构原始数据
        saasPackageOpeningModalTransferAllcontent,      //机构穿梭框左边数据
        saasPackageOpeningModalTransferTargetContent,   //机构穿梭框右边数据
        newtransferArray,
        selectPackageName,
        transferArray,
    } = saasPackageManage

    /*Saas模块管理*/
    /*模块列表*/
    /*查看模块中包含的菜单*/
    let CheckModular = function (item, index) {
        dispatch({
            type: 'saasPackageManage/showRoleFuncs',
            payload: {
                id: item.id,
                index,
            }
        });
    }
    /*切换系统类型(1机构/2总部)*/
    let ModularResTypeOnChange = function (e) {
        // 切换让newtransferArray为空 会重新赋值
        dispatch({
            type: 'saasPackageManage/updateState',
            payload: {
                newtransferArray: [],
            }
        })
        switch (e.target.value) {
            case '2':
                dispatch({
                    type: 'saasPackageManage/GetModularList',
                    payload: {
                        resType: e.target.value,
                    }
                })
                break;
            case '1':
                dispatch({
                    type: 'saasPackageManage/updateState',
                    payload: {
                        transferArray: [{ key: "zsb", title: "招生宝" }, { key: "crm", title: "CRM" }, { key: "saas", title: "教务" }, { key: "syb", title: "收银宝" }, { key: "sgb", title: "时光宝" }, { key: "recorded", title: "录播模块" }, { key: "live", title: "直播课程" }],
                    }
                })
                dispatch({
                    type: 'saasPackageManage/showMarketingPackageListAll',
                    payload: {
                        pageIndex: 0,
                        pageSize: 9999,
                        resType: e.target.value,
                    }
                })
                break;
        }
        // dispatch({
        //     type: 'saasPackageManage/GetModularList',
        //     payload: {
        //         resType: e.target.value
        //     }
        // })
    }

    /*新增编辑模块*/
    /*打开新增编辑表单*/
    let AddOrEditModular = function (type, item) {
        dispatch({
            type: 'saasPackageManage/updateState',
            payload: {
                addOrEditSaasModularModalVisible: true,
                addOrEditSaasModularModalData: item,
                addOrEditSaasModularModalType: type
            }
        });
    }

    /*模块新增编辑表单提交*/
    let AddOrEditSaasModularModalSubmit = function (data) {
        if (addOrEditSaasModularModalType == 'add') {
            dispatch({
                type: 'saasPackageManage/AddNewModular',
                payload: {
                    ...data
                }
            });
        } else if (addOrEditSaasModularModalType == 'edit') {
            dispatch({
                type: 'saasPackageManage/EditExistModular',
                payload: {
                    id: modularSelectedProps.id,
                    ...data
                }
            });
        }
    }

    /*关闭modal*/
    let AddOrEditSaasModularModalCancel = function () {
        dispatch({
            type: 'saasPackageManage/updateState',
            payload: {
                addOrEditSaasModularModalVisible: false
            }
        });
    }

    /*菜单列表*/
    /*点击展开菜单*/
    let MenuListOnExpend = function (expandedKeys) {
        //console.info('expandedKeys',expandedKeys);
        dispatch({
            type: 'saasPackageManage/updateState',
            payload: {
                secondListArray: expandedKeys,
            }
        });
    }

    /*选中菜单*/
    let MenuListOnCheck = function (checkedKeys, e) {
        dispatch({
            type: 'saasPackageManage/updateState',
            payload: {
                menuCheckedArray: checkedKeys,
            }
        });
    }

    /*对应模块菜单保存并更新版本*/
    let SaveModularMenu = function () {
        dispatch({
            type: 'saasPackageManage/EditExistModular',
            payload: {
                id: modularSelectedProps.id,
                resources: menuCheckedArray.join(','),
            }
        });
    }

    /*对应模块菜单保存不更新版本*/
    let SaveModularMenuNotUpdate = function () {
        dispatch({
            type: 'saasPackageManage/EditExistModularNotUpdate',
            payload: {
                id: modularSelectedProps.id,
                resources: menuCheckedArray.join(','),
            }
        });
    }

    /*Saas套餐管理*/
    /*搜索栏*/
    /*搜索栏点击筛选*/
    let ShowPackageSearchTable = function () {
        dispatch({
            type: 'saasPackageManage/updateState',
            payload: {
                saasPackageManageSearchVisible: !saasPackageManageSearchVisible
            },
        });
    }

    /*搜索栏点击查询*/
    let SaasPackageManageSearchSubmit = function (data) {
        dispatch({
            type: 'saasPackageManage/GetPackageList',
            payload: {
                pageIndex: 0,
                pageSize: saasPackageManagePageSize,
                ...data
            }
        });
    }

    /*搜索栏点击清除条件*/
    let SaasPackageManageSearchReset = function () {
        dispatch({
            type: 'saasPackageManage/GetPackageList',
            payload: {
                pageIndex: 0,
                pageSize: saasPackageManagePageSize,
            }
        });
    }

    /*table列表*/
    /*列表分页改变*/
    let SaasPackageManageTableOnChange = function (pagination, filters, sorter) {
        dispatch({
            type: 'saasPackageManage/GetPackageList',
            payload: {
                pageIndex: pagination.current - 1,
                pageSize: pagination.pageSize,
                ...saasPackageManageSearchData
            },
        });
    }

    /*套餐改变上下架状态*/
    let SaasPackageChangeStatus = function (data, type) {
        if (type == 'reUp') {
            dispatch({
                type: 'saasPackageManage/SaasPackageUpOrDown',
                payload: {
                    status: 2,
                    id: data.id,
                }
            });
        } else if (data.status == '0' || data.status == 0) {
            dispatch({
                type: 'saasPackageManage/SaasPackageUpOrDown',
                payload: {
                    status: 1,
                    id: data.id,
                }
            });
        } else if (data.status == '1' || data.status == 1) {
            dispatch({
                type: 'saasPackageManage/SaasPackageUpOrDown',
                payload: {
                    status: 0,
                    id: data.id,
                }
            })
        }
    }

    let selectFunc = function (val) {
        // dispatch({
        //     type: 'saasPackageManage/updateState',
        //     payload: {
        //         selectPackage: val
        //     }
        // });
        if(val) {
          let selectPackageName = [];
          val.map(value =>{
              saasPackageOpeningModalSelectContent.map(item => {
                     if(value === item.id) {
                         selectPackageName.push(item)
                     }
                 })
             })
          dispatch({
            type: 'saasPackageManage/updateState',
            payload: {
              selectPackageName: selectPackageName
            }
          });
        }
    }

    // let selectFunc = function (val, option) {

    //     // console.log(option.props.children)
    //     dispatch({
    //         type: 'saasPackageManage/updateState',
    //         payload: {
    //             moduleName: option.props.children
    //         }
    //     });
    // }
    /*查看套餐包含模块属性*/
    /*打开modal*/
    // let CheckIncludeModular = function (passId) {
    //     dispatch({
    //         type: 'saasPackageManage/ModalGetPackageList',
    //         payload: {
    //             pageIndex: 0,
    //             pageSize: 9999,
    //             passId,
    //         }
    //     });
    // }
    let CheckIncludeModular = function (id, name) {

        dispatch({
            type: 'saasPackageManage/ModalGetPackageList',
            payload: {
                id,
            }
        });
        dispatch({
            type: 'saasPackageManage/updateState',
            payload: {
                moduleName: name
            }
        });
    }

    /*关闭modal*/
    let SaasPackageCheckIncludeModalCancel = function () {
        dispatch({
            type: 'saasPackageManage/updateState',
            payload: {
                saasPackageCheckVisible: false,
            }
        });
    }

    /*新增编辑套餐*/
    /*打开新增编辑套餐modal*/
    let AddOrEditPackage = function (type, data) {
        if (type == 'edit') {
            // 编辑套餐的时候
            dispatch({
                type: 'saasPackageManage/showMarketingPackageListAll',
                payload: {
                    pageIndex: 0,
                    pageSize: 9999,
                }
            })
            let array = [];
            let arrayNew = [];
            if (data.resType == "1") {
                // console.log(data.appCode)
                if (data.appCode == null) {
                    arrayNew = []
                } else {
                    arrayNew = data.appCode.split(',');
                }

                if (data.zsbModuleInfo && data.zsbModuleInfo.length > 0) {
                    for (let i in data.zsbModuleInfo) {
                        array.push((data.zsbModuleInfo)[i].moduleId);
                    }
                }
                dispatch({
                    type: 'saasPackageManage/updateState',
                    payload: {
                        transferArray: [{ key: "zsb", title: "招生宝" }, { key: "crm", title: "CRM" }, { key: "saas", title: "教务" }, { key: "syb", title: "收银宝" },{ key: "sgb", title: "时光宝" }, { key: "recorded", title: "录播模块" }, { key: "live", title: "直播课程" }],
                    }
                })
            }
            if (data.resType == "2") {
                for (let j in data.hqModuleInfo) {
                    arrayNew.push(data.hqModuleInfo[j].hqModuleId)
                }
                dispatch({
                    type: 'saasPackageManage/GetModularList',
                    payload: {
                        resType: data.resType
                    }
                })

            }
            dispatch({
                type: 'saasPackageManage/updateState',
                payload: {
                    addOrEditSaasPackageModalVisible: true,
                    addOrEditSaasPackageModalType: type,
                    addOrEditSaasPackageModalData: data,
                    addOrEditSaasPackageTransferTargetContent: array,
                    newtransferArray: arrayNew,
                }
            });

        } else if (type == 'add') {
            // 新增的时候请求列表
            dispatch({
                type: 'saasPackageManage/showMarketingPackageListAll',
                payload: {
                    pageIndex: 0,
                    pageSize: 9999,
                    status: 1
                }
            })
            if (modularResType == '2') {
                dispatch({
                    type: 'saasPackageManage/GetModularList',
                    payload: {
                        resType: modularResType
                    }
                })
            }
            if (modularResType == '1') {
                dispatch({
                    type: 'saasPackageManage/updateState',
                    payload: {
                        transferArray: [{ key: "zsb", title: "招生宝" }, { key: "crm", title: "CRM" }, { key: "saas", title: "教务" }, { key: "syb", title: "收银宝" },{ key: "sgb", title: "时光宝" }, { key: "recorded", title: "录播模块" }, { key: "live", title: "直播课程" }],
                    }
                })
            }
            dispatch({
                type: 'saasPackageManage/updateState',
                payload: {
                    addOrEditSaasPackageModalVisible: true,
                    addOrEditSaasPackageModalType: type,
                    addOrEditSaasPackageModalData: {},
                    newtransferArray: [],
                    addOrEditSaasPackageTransferTargetContent: [],
                }
            });
        }
    }

    /*关闭新增编辑套餐modal*/
    let AddOrEditSaasPackageModalCancel = function () {
        dispatch({
            type: 'saasPackageManage/updateState',
            payload: {
                addOrEditSaasPackageModalVisible: false,
            }
        });
    }

    /*表单提交*/
    let AddOrEditSaasPackageModalSubmit = function (data) {

        if (addOrEditSaasPackageModalType == 'add') {
            dispatch({
                type: 'saasPackageManage/AddNewPackage',
                payload: {
                    ...data
                }
            });
        } else if (addOrEditSaasPackageModalType == 'edit') {
            dispatch({
                type: 'saasPackageManage/EditExistPackage',
                payload: {
                    id: addOrEditSaasPackageModalData.id,
                    ...data
                }
            });
        }
    }

    /*穿梭框onChange事件*/
    let AddOrEditFormActivityTransferhandleChange = function (targetKeys, direction, moveKeys) {
        dispatch({
            type: 'saasPackageManage/updateState',
            payload: {
                addOrEditSaasPackageTransferTargetContent: targetKeys,
            }
        });
    }

    /*穿梭框onChange事件*/
    let transferArrayChange = function (targetKeys, direction, moveKeys) {

        // let sgbIndex = targetKeys.indexOf('sgb')
        // let recIndex = targetKeys.indexOf('recorded')
        // let rightSgb = newtransferArray.indexOf('sgb')
        // if((sgbIndex > -1 && recIndex > -1) || (rightSgb > -1 && recIndex > -1)){
          dispatch({
            type: 'saasPackageManage/updateState',
            payload: {
                newtransferArray: targetKeys,
            }
          });
        // } else {
        //   message.error('请先选择时光宝模块！')
        // }

    }

    /*Saas套餐开通*/
    /*Saas套餐开通搜索栏*/
    /*点击筛选*/
    let ShowPackageOpeningSearchBar = function () {
        dispatch({
            type: 'saasPackageManage/updateState',
            payload: {
                saasPackageOpeningSearchVisible: !saasPackageOpeningSearchVisible,
            },
        });
    }

    /*点击搜索*/
    let SaasPackageOpeningSearchSubmit = function (data) {
        dispatch({
            type: 'saasPackageManage/updateState',
            payload: {
                saasPackageOpeningSearchData: data,
                saasPackageOpeningPageIndex: 0,
            },
        });
        dispatch({
            type: 'saasPackageManage/GetPackingOpening',
            payload: {
                pageIndex: 0,
                pageSize: saasPackageOpeningPageSize,
                ...data
            },
        });
    }

    /*点击清除条件*/
    let SaasPackageOpeningSearchReset = function () {
        dispatch({
            type: 'saasPackageManage/updateState',
            payload: {
                saasPackageOpeningSearchData: {},
                saasPackageOpeningPageIndex: 0
            },
        });
        dispatch({
            type: 'saasPackageManage/GetPackingOpening',
            payload: {
                pageIndex: 0,
                pageSize: saasPackageOpeningPageSize,
            },
        });
    }

    /*Saas套餐开通table列表*/
    /*列表分页*/
    let SaasPackageOpeningTableOnChange = function (pagination, filters, sorter) {
        dispatch({
            type: 'saasPackageManage/updateState',
            payload: {
                saasPackageOpeningPageIndex: pagination.current - 1,
                saasPackageOpeningPageSize: pagination.pageSize,
            },
        });
        dispatch({
            type: 'saasPackageManage/GetPackingOpening',
            payload: {
                pageIndex: pagination.current - 1,
                pageSize: pagination.pageSize,
                ...saasPackageOpeningSearchData
            },
        });
    }

    /*列表套餐设置状态*/
    let SetSaasPackageStatus = function (data) {
        dispatch({
            type: 'saasPackageManage/SetPackageOpeningType',
            payload: {
                orgId: data.orgId,
                tenantId: data.tenantId,
                orgAvailableResId: data.id
            },
        });
    }

    /*按查询结果导出*/
    let ExportTableContent = function () {
        window.open(`${BASE_URL}/meal/exportOpenResPackages?${qs.stringify(saasPackageOpeningSearchData)}`)
    }

    /*Saas套餐开通表单*/
    /*点击套餐开通*/
    let OpeningPackage = function () {
        dispatch({
            type: 'saasPackageManage/GetPackageSelectList',
            payload: {
                pageSize: 99999,
                pageIndex: 0,
                status: 1,
                resType: '1'       //默认查询系统类型为机构的
            }
        });
    }

    /*根据系统类型查询当前套餐*/
    let MealListResTypeOnChange = function (e) {
        dispatch({
            type: 'saasPackageManage/GetPackageSelectList',
            payload: {
                pageSize: 99999,
                pageIndex: 0,
                status: 1,
                resType: e.target.value       //默认查询系统类型为机构的
            }
        });
        dispatch({
            type: 'saasPackageManage/updateState',
            payload: {
                saasPackageOpeningModalTenantSelectVisible: false,
                saasPackageOpeningModalTransferAllcontent: []
            }
        })
    }

    /*选择搜索方式onChange事件*/
    let SaasPackageOpeningModalChooseQueryType = function (value) {
        dispatch({
            type: 'saasPackageManage/updateState',
            payload: {
                saasPackageOpeningModalSearchType: value,
                saasPackageOpeningModalTenantSelectVisible: false,
                saasPackageOpeningModalTenantSelectContent: [],     //租户下拉列表数据
                saasPackageOpeningModalTransferAllcontent: [],      //机构穿梭框左边数据
                saasPackageOpeningModalTransferTargetContent: [],   //机构穿梭框右边数据
            },
        });
    }

    /*搜索通过机构名称或手机号搜索机构*/
    let SaasPackageOpeningModalSearchOrgNameOrTel = function (data, resType) {
        dispatch({
            type: 'saasPackageManage/GetOrgDetail',
            payload: {
                nameOrMobile: data,
                orgKind: resType
            },
        });
    }

    /*搜索租户列表*/
    let SaasPackageOpeningModalSearchTenant = function (id, name, tel) {
        dispatch({
            type: 'saasPackageManage/GetTenantDetail',
            payload: {
                id,
                name,
                tel,
                pageIndex: 0,
                pageSize: 99999,
            },
        });
    }

    /*通过租户搜索机构*/
    let SaasPackageOpeningModalSearchOrgByTenant = function (id, resType) {
        dispatch({
            type: 'saasPackageManage/GetOrgByTenantId',
            payload: {
                id,
                orgKind: resType
            }
        });
    }

    /*穿梭款onChange事件*/
    let SaasPackageOpeningModalTransferhandleChange = function (targetKeys, direction, moveKeys) {
        dispatch({
            type: 'saasPackageManage/updateState',
            payload: {
                saasPackageOpeningModalTransferTargetContent: targetKeys,
            }
        });
    }

    /*查看套餐中的模块*/
    let SaasPackageOpeningModalCheckPackageType = function (value) {
        console.info(value);
    }

    /*表单提交*/
    let SaasPackageOpeningModalSubmit = function (data) {
        dispatch({
            type: 'saasPackageManage/OpeningPackage',
            payload: {
                ...data
            }
        });
    }

    /*表单关闭*/
    let SaasPackageOpeningModalCancel = function () {
        dispatch({
            type: 'saasPackageManage/updateState',
            payload: {
                saasPackageOpeningModalVisible: false,
                saasPackageOpeningModalTenantSelectVisible: false,
                saasPackageOpeningModalSearchType: '1',
                saasPackageOpeningModalTenantSelectContent: [],
                saasPackageOpeningModalTransferAllcontent: [],
                saasPackageOpeningModalTransferTargetContent: [],
                selectPackageName: []
            },
        });
    }

    /*Saas模块管理属性*/
    /*模块与菜单块管理列表属性*/
    let saasModularManageListProps = {
        /*模块列表*/
        modularResType,                     //模块类型(1机构/2总部)
        modularListLoading,                 //模块列表加载状态
        allModularList,                     //模块列表数据
        wetherSelectModularItem,            //选中模块的索引项
        ModularResTypeOnChange,             //切换套餐类型(1机构/2总部)
        CheckModular,                       //查看模块中包含的子模块和菜单
        AddOrEditModular,                   //打开新增编辑模块modal,入参为类型('add'/'edit')
        SaveModularMenu,                    //对应模块菜单保存更新版本
        SaveModularMenuNotUpdate,           //对应模块菜单保存不更新版本

        /*菜单列表*/
        menuListLoading,                    //菜单加载状态
        allMenuList,                        //菜单列表内容
        menuCheckedArray,                   //选中的菜单
        secondListArray,                    //打开的树结构(默认是二级菜单)
        MenuListOnExpend,                   //点击展开菜单
        MenuListOnCheck,                    //选中菜单
    }

    /*新增编辑模块modal属性*/
    let saasModularManageAddOrEditModularProps = {
        modularResType,                             //模块类型(1机构/2总部)
        addOrEditSaasModularModalType,              //模块管理新增修改类型('add'/'edit')
        addOrEditSaasModularModalVisible,           //模块管理modal是否显示
        addOrEditSaasModularModalData,              //模块管理编辑时回填数据
        addOrEditSaasModularButtonLoading,          //模块管理按钮是否加载状态

        AddOrEditSaasModularModalSubmit,            //模块新增编辑表单提交
        AddOrEditSaasModularModalCancel,            //关闭modal
    }

    /*Saas套餐管理属性*/
    /*套餐管理搜索栏属性*/
    let saasPackageManageSearchProps = {
        SaasPackageManageSearchSubmit,              //搜索栏点击查询
        SaasPackageManageSearchReset,               //搜索栏点击清除条件
    }

    /*套餐管理列表属性*/
    let saasPackageManageTableProps = {
        saasPackageManagePageIndex,                 //套餐页码
        saasPackageManagePageSize,                  //套餐每页条数
        saasPackageManageTableData,                 //套餐管理列表数据
        saasPackageManagetotal,                     //套餐管理列表条数
        saasPackageManageLoading,                   //套餐管理列表加载状态

        AddOrEditPackage,                           //新增套餐
        ShowPackageSearchTable,                     //点击筛选
        SaasPackageManageTableOnChange,             //套餐管理列表状态改变(分页等)
        SaasPackageChangeStatus,                    //套餐改变上下架状态
        CheckIncludeModular,
        //查看套餐内包含的模板
        moduleName
    }

    /*查看套餐包含模块属性*/
    let saasPackageCheckIncludeModularModalProps = {
        saasPackageCheckVisible,                    //查看包含模块modal显示
        saasPackageCheckIncludeData,                //查看包含模块数据
        SaasPackageCheckIncludeModalCancel,         //查看包含模块modal关闭
        checkModalContentData,
        checkModalNoDefaultExpandedKeys,
        checkModalNoDefaultExpandedKeysleft,
        moduleName

    }

    /*套餐管理新增修改属性*/
    let saasPackageManageAddOrEditProps = {
        modularResType,                             //模块类型(1机构/2总部)
        addOrEditSaasPackageModalType,              //套餐管理新增修改类型('add'/'edit')
        addOrEditSaasPackageModalVisible,           //套餐管理modal是否显示
        addOrEditSaasPackageModalData,              //套餐管理编辑时回填数据
        addOrEditSaasPackageButtonLoading,          //套餐管理按钮是否加载状态

        addOrEditSaasPackageransferAllContent,      //穿梭框内所有模板的值
        addOrEditSaasPackageTransferTargetContent,  //穿梭框所选中的模板

        ModularResTypeOnChange,                     //切换系统类型(1机构/2总部)

        AddOrEditSaasPackageModalSubmit,            //表单提交
        AddOrEditSaasPackageModalCancel,            //关闭modal
        AddOrEditFormActivityTransferhandleChange,  //穿梭框onChange事件
        transferArrayChange,
        newtransferArray,
        transferArray
    }

    /*Saas套餐开通属性*/
    /*Saas套餐开通搜索栏属性*/
    let saasPackageOpeningSearchProps = {
        SaasPackageOpeningSearchSubmit,      //搜索栏点击查询
        SaasPackageOpeningSearchReset,       //搜索栏点击清除条件
    }

    /*Saas套餐开通列表属性*/
    let saasPackageOpeningTableProps = {
        saasPackageOpeningPageIndex,        //套餐页码
        saasPackageOpeningPageSize,         //套餐每页条数
        saasPackageOpeningTableData,        //套餐管理列表数据
        saasPackageOpeningTotal,            //套餐管理列表条数
        saasPackageOpeningLoading,          //套餐管理列表加载状态
        CheckIncludeModular,                //查看套餐中的模块  
        OpeningPackage,                     //开通套餐
        ShowPackageOpeningSearchBar,        //点击筛选
        SaasPackageOpeningTableOnChange,    //套餐管理列表状态改变(分页等)
        SetSaasPackageStatus,               //套餐设置状态
        ExportTableContent,                 //按查询结果导
        moduleName,                         //选中的名字
    }

    /*Saas套餐开通表单属性*/
    let saasPackageOpeningModalProps = {
        saasPackageOpeningModalVisible,                 //modal是否显示
        saasPackageOpeningModalButtonLoading,           //modal按钮是否在加载状态
        saasPackageOpeningModalSelectContent,           //套餐列表数据
        saasPackageOpeningModalSearchType,              //机构搜索方式(0按机构和机构手机号/1按租户查询)
        saasPackageOpeningModalTenantSelectVisible,     //租户下拉列表是否显示(搜素租户之后才显示)
        saasPackageOpeningModalTenantSelectContent,     //租户下拉列表数据
        saasPackageOpeningModalOrgArray,                //接口获取的机构原始数据
        saasPackageOpeningModalTransferAllcontent,      //机构穿梭框左边数据
        saasPackageOpeningModalTransferTargetContent,   //机构穿梭框右边数据

        MealListResTypeOnChange,                        //根据系统类型查询当前套餐
        SaasPackageOpeningModalCancel,                  //模态框关闭
        SaasPackageOpeningModalChooseQueryType,         //选择搜索方式onChange事件
        SaasPackageOpeningModalTransferhandleChange,    //穿梭款onChange事件
        CheckIncludeModular,                            //查看套餐中的模块
        SaasPackageOpeningModalSubmit,                  //表单提交
        SaasPackageOpeningModalSearchOrgNameOrTel,      //机构名称或手机号搜索
        SaasPackageOpeningModalSearchTenant,            //搜索租户列表
        SaasPackageOpeningModalSearchOrgByTenant,       //通过租户搜索机构
        moduleName,                                     //选中的名字
        selectFunc,                         //选择框方法
        selectPackageName,
        selectPackage                                  // 选中的数组名字id
    }



    /*分页 改变*/
    let tableOnChange = function (pagination, filters, sorter) {
        // console.log(...searchData)
        dispatch({
            type: 'saasPackageManage/showMarketingPackageList',
            payload: {
                pageIndex: pagination.current - 1,
                pageSize: pagination.pageSize,
                ...searchData,
            },
        });
    }

    /*点击筛选*/
    let tableOnFilter = function () {
        dispatch({
            type: 'saasPackageManage/updateState',
            payload: {
                searchVisible: !searchVisible,
            }
        });
    }

    /*点击搜索*/
    let searchSubmit = function (data) {
        dispatch({
            type: 'saasPackageManage/showMarketingPackageList',
            payload: {
                ...data,
                pageSize,
                pageIndex: 0,
            }
        });
    }

    //微信游戏row checkbox点击事件
    function limityIndexFun(index, key, e) {

        //要更改的操作
        let handle_bj = {
            type: key,
            key: addOrEditFormGameTransferAllContent[index].key,
            data: e,
            index
        };

        let selectLimitNumBoxNum = 0, selectChartBoxNum = 0, isSelectAllLimitNum, isSelectAllLimit, isSelectAllChartBox;

        let data_e = e;

        if (key === 'isLimit') {
            addOrEditFormGameTransferAllContent[index].isLimit = !addOrEditFormGameTransferAllContent[index].isLimit;

        }
        else if (key === 'limitNum') {

            let obj = addOrEditFormGameTransferAllContent[index];

            selectData && selectData.map((item, index) => {
                if (item.key == obj.key) {
                    item.limitNum = e;
                }
                if (item.id == obj.key) {
                    item.limitNum = e;
                }
            })
        }
        else if (key === 'chart') {
            addOrEditFormGameTransferAllContent[index].chart = !addOrEditFormGameTransferAllContent[index].chart;
            let obj = addOrEditFormGameTransferAllContent[index];
            let count = 0;
            selectData && selectData.map((item, index) => {
                if (item.id == obj.key) {
                    item.chart = !e;
                }

                if (item.chart) {
                    selectChartBoxNum++;
                }

            })
            dispatch({
                type: 'saasPackageManage/updateState',
                payload: {
                    chartLimit: (chartLimit + 1),
                    addOrEditFormGameTransferAllContent,
                    selectData,
                }
            });
        }
        for (const item of addOrEditFormGameTransferAllContent) {
            if (item.isLimit === false) selectLimitNumBoxNum += 1;
        }

        if (selectLimitNumBoxNum === allPrivilegeNum) {
            isSelectAllLimitNum = true;
            isSelectAllLimit = false;
        }
        else if (selectLimitNumBoxNum === 0) {
            isSelectAllLimitNum = false;
            isSelectAllLimit = true;
        }
        else {
            isSelectAllLimitNum = false;
            isSelectAllLimit = false;
        }

        if (selectChartBoxNum === allPrivilegeNum) {
            isSelectAllChartBox = true;
        }
        else {
            isSelectAllChartBox = false;
        }


        dispatch({
            type: 'saasPackageManage/updateState',
            payload: {
                addOrEditFormGameTransferAllContent,
                isSelectAllLimitNum,
                isSelectAllLimit,
                isSelectAllChartBox,
                selectLimitNumBoxNum,
                selectChartBoxNum,
                allPrivilegeNum,
                selectData
            }
        });

    }

    //微信游戏title checkbox点击事件
    function selectedLimitYFun(key, e) {
        //isLimit等false代表限制人数
        if (key === 'limitNum') {
            if (isSelectAllLimitNum === true) {

                //不限制人数应该全部勾选
                for (let item of addOrEditFormGameTransferAllContent) {
                    if (item.hasOwnProperty('chart')) item.isLimit = true;
                }
                isSelectAllLimitNum = false;
                isSelectAllLimit = true;
                selectLimitNumBoxNum = 0;
            }
            else {
                //限制人数应该勾选
                for (let item of addOrEditFormGameTransferAllContent) {
                    if (item.hasOwnProperty('chart')) item.isLimit = false;
                }
                isSelectAllLimitNum = true;
                isSelectAllLimit = false;
                selectLimitNumBoxNum = allPrivilegeNum;
            }
        }
        else if (key === 'isLimit') {
            if (isSelectAllLimit === true) {
                //限制人数应该勾选
                for (let item of addOrEditFormGameTransferAllContent) {
                    if (item.hasOwnProperty('chart')) item.isLimit = false;
                }
                isSelectAllLimitNum = true;
                isSelectAllLimit = false;
                selectLimitNumBoxNum = allPrivilegeNum;
            }
            else {
                //不限制人数应该勾选
                for (let item of addOrEditFormGameTransferAllContent) {
                    if (item.hasOwnProperty('chart')) item.isLimit = true;
                }
                isSelectAllLimitNum = false;
                isSelectAllLimit = true;
                selectLimitNumBoxNum = 0;
            }
        }
        else if (key === 'chart') {
            if (isSelectAllChartBox === false) {
                for (let item of addOrEditFormGameTransferAllContent) {
                    if (item.hasOwnProperty('chart')) item.chart = true;
                }
                isSelectAllChartBox = true;
                selectChartBoxNum = allPrivilegeNum;
            }
            else {
                for (let item of addOrEditFormGameTransferAllContent) {
                    if (item.hasOwnProperty('chart')) item.chart = false;
                }
                isSelectAllChartBox = false;
                selectChartBoxNum = 0;
            }
        }

        dispatch({
            type: 'saasPackageManage/updateState',
            payload: {
                addOrEditFormGameTransferAllContent,
                isSelectAllLimitNum,
                isSelectAllLimit,
                isSelectAllChartBox,
                selectLimitNumBoxNum,
                selectChartBoxNum,
                allPrivilegeNum
            }
        });
    }



    function selectedLimitNFun(key, e) {
        if (key === 'isLimit') {
            for (const item of addOrEditFormGameTransferAllContent) {
                if (item.hasOwnProperty('isLimit')) {
                    //                    console.log('2', item);
                    item.isLimit = e[0] === '2' ? true : false;
                }
            }
        }
        dispatch({
            type: 'saasPackageManage/updateState',
            payload: {
                addOrEditFormGameTransferAllContent
            }
        });
    }

    function numValueFun() {
        dispatch({
            type: 'saasPackageManage/updateState',
            payload: {
                numValue: 4,
            }
        });
    }
    function selectedChartFun(key, e) {
        //        console.log(key, e.target.options[0].value);
        if (key === 'chart') {
            //            console.log('11111111', addOrEditFormGameTransferAllContent);
            for (const item of addOrEditFormGameTransferAllContent) {
                if (item.hasOwnProperty('chart')) {
                    //                    console.log('2', item);
                    item.chart = e[0] === '1' ? true : false;
                }
            }
        }
        dispatch({
            type: 'saasPackageManage/updateState',
            payload: {
                addOrEditFormGameTransferAllContent,
            }
        });
    }

    /*点击清除*/
    let searchReset = function () {
        dispatch({
            type: 'saasPackageManage/showMarketingPackageList',
            payload: {
                pageSize,
                pageIndex: 0,
            }
        });
    }

    /*设置上架*/
    let tableWeiXinPackageUp = function (id) {
        let status = 1;
        dispatch({
            type: 'saasPackageManage/packageChangeStatus',
            payload: {
                id,
                status,
            }
        });
    }

    /*设置下架*/
    let tableWeiXinPackageDown = function (id) {
        let status = 0;
        dispatch({
            type: 'saasPackageManage/packageChangeStatus',
            payload: {
                id,
                status,
            }
        });
    }

    //更新购买记录
    let tableWeiXinPackageUpdateBuyRecord = function (id) {
        dispatch({
            type: 'saasPackageManage/tableWeiXinPackageUpdateBuyRecord',
            payload: {
                id
            }
        });
    }

    /*营销模块点击新增时弹窗*/
    let tableOnCreate = function () {
        dispatch({
            type: 'saasPackageManage/openAddPackageModal',
        });
    }


    /*营销模块点击编辑时弹窗*/
    let tableOnEditItem = function (data) {
        // console.log(data)
        dispatch({
            type: 'saasPackageManage/openEditPackageModal',
            payload: {
                ...data,
            }
        });

    }

    /*新增编辑提交*/
    let addOrEditModalSubmit = function (data, type) {
        dispatch({
            type: 'saasPackageManage/updateState',
            payload: {
                addOrEditButtonLoading: true,
            }
        });
        if ('add' == type) {
            dispatch({
                type: 'saasPackageManage/addPackageSubmit',
                payload: {
                    ...data
                }
            });
        } else if ('edit' == type) {
            dispatch({
                type: 'saasPackageManage/editPackageSubmit',
                payload: {
                    ...data
                }
            });
        }
    }

    /*新增编辑弹窗关闭*/
    let addOrEditModalCancel = function () {
        dispatch({
            type: 'saasPackageManage/updateState',
            payload: {
                addOrEditFormVisible: false,
                addOrEditButtonLoading: false,
                addOrEditFormData: {},
                addOrEditFormActivityTransferAllContent: [],
                addOrEditFormAdminiTransferAllContent: [],//----------------------------------------------
                addOrEditFormGameTransferAllContent: [],
                addOrEditFormOfflineLeafletsTransferAllContent: [],
            }
        });
    }

    /*新增编辑表单微信活动穿梭框状态改变*/
    let addOrEditFormActivityTransferhandleChange = function (targetKeys, direction, moveKeys) {
        dispatch({
            type: 'saasPackageManage/updateState',
            payload: {
                addOrEditFormActivityTransferTargetContent: targetKeys,
            }
        });
    }

    /*新增编辑表单活管理穿梭框状态改变-----------------------------------------------------------------*/
    let addOrEditFormAdminiTransferhandleChange = function (targetKeys, direction, moveKeys) {
        dispatch({
            type: 'saasPackageManage/updateState',
            payload: {
                addOrEditFormAdminiTransferTargetContent: targetKeys,
            }
        });
        console.info(targetKeys, direction, moveKeys, "targetKeys, direction, moveKeys")
    }

    /*新增编辑表单微信游戏穿梭框状态改变*/
    let addOrEditFormGameTransferhandleChange = function (targetKeys, direction, moveKeys) {
        dispatch({
            type: 'saasPackageManage/updateState',
            payload: {
                addOrEditFormGameTransferTargetContent: targetKeys,
            }
        });
    }

    /*新增编辑线下传单游戏穿梭框状态改变*/
    let addOrEditFormOfflineLeafletsTransferhandleChange = function (targetKeys, direction, moveKeys) {
        dispatch({
            type: 'saasPackageManage/updateState',
            payload: {
                addOrEditFormOfflineLeafletsTransferTargetContent: targetKeys,
            }
        });
    }

    /*点击包含模版字段下的内容时弹窗*/
    let tableOnCheckModal = function (id) {
        dispatch({
            type: 'saasPackageManage/checkIncludingModal',
            payload: {
                id,
            }
        });
    }


    //更新微游戏过滤关键字
    function onGameModuleKeyWordFilter(keyWord) {
        dispatch({
            type: 'saasPackageManage/updateState',
            payload: {
                gameModuleFilterKeyWord: keyWord,
            }
        });
    }

    //变更选中微游戏模板数据
    function handleOnGameModuleConfigChange(eventType, eventData) {
        dispatch({
            type: 'saasPackageManage/handleOnGameModuleConfigChange',
            payload: {
                eventType, eventData
            }
        });
    }

    /*选中所有的  限制人数*/
    function handleSelectAllLimitNum(currentListKeys) {
        dispatch({
            type: 'saasPackageManage/handleSelectAllLimitNum',
            payload: {
                currentListKeys
            }
        });
    }

    /*选中所有的  不限制人数*/
    function handleSelectAllNoLimitNum(currentListKeys) {
        dispatch({
            type: 'saasPackageManage/handleSelectAllNoLimitNum',
            payload: {
                currentListKeys
            }
        });
    }

    /*选中所有的  开通社交图谱*/
    function handleSelectAllLimitEcharts(currentListKeys) {
        dispatch({
            type: 'saasPackageManage/handleSelectAllLimitEcharts',
            payload: {
                currentListKeys
            }
        });
    }

    /*包含模板数弹窗关闭*/
    let checkModalNoModalCancel = function () {
        dispatch({
            type: 'saasPackageManage/updateState',
            payload: {
                checkModalVisible: false,
            }
        });
    }

    let marketingPackageSearchProps = {
        searchReset,
        searchSubmit,
    }

    /*营销套餐列表属性*/
    let marketingPackageListProps = {
        loading,
        total,
        list,
        tableOnChange,
        tableOnEditItem,

        tableOnCheckModal,
        tableOnCreate,
        tableOnFilter,
        tableWeiXinPackageUp,
        tableWeiXinPackageDown,
        tableWeiXinPackageUpdateBuyRecord,      //更新购买记录
    }

    /*查看模板数量弹窗属性*/
    let marketingPackageCheckModalNoModalProps = {
        checkModalNoDefaultExpandedKeys,
        checkModalContent,
        checkModalVisible,
        checkModalNoModalCancel,
    }

    /*新增编辑表单属性*/
    let marketingPackageAddOrEditModalProps = {
        dispatch,
        selectData,
        isSelectAllLimitNum,
        isSelectAllLimit,
        isSelectAllChartBox,
        selectLimitNumBoxNum,
        selectChartBoxNum,
        allPrivilegeNum,
        selectedRowKeys,
        addOrEditFormType,
        addOrEditFormVisible,
        addOrEditFormData,
        addOrEditButtonLoading,
        addOrEditFormActivityTransferAllContent,
        addOrEditFormActivityTransferTargetContent,
        addOrEditFormAdminiTransferAllContent,//-------------------------------------------------
        addOrEditFormAdminiTransferTargetContent,//--------------------------------------------------
        addOrEditFormGameTransferAllContent,
        addOrEditFormGameTransferTargetContent,
        gameModuleFilterKeyWord,
        onGameModuleKeyWordFilter, handleOnGameModuleConfigChange,

        handleSelectAllLimitNum,//选中所有  限制人数
        handleSelectAllNoLimitNum,//选中所有  不限制人数
        handleSelectAllLimitEcharts,//选中所有  开通社交图谱


        addOrEditFormOfflineLeafletsTransferAllContent,
        addOrEditFormOfflineLeafletsTransferTargetContent,
        addOrEditModalSubmit,
        addOrEditModalCancel,
        addOrEditFormActivityTransferhandleChange,
        addOrEditFormAdminiTransferhandleChange,//------------------------------------------------
        addOrEditFormGameTransferhandleChange,
        addOrEditFormOfflineLeafletsTransferhandleChange,
        selectedLimitYFun,//已选限制
        selectedLimitNFun,//已选不限制
        selectedLimitY,//已选限制
        selectedLimitN,//已选不限制
        numValueFun,
        numValue,
        selectedChartFun,
        selectedChart,
        limityIndexFun,
        text,
        chartLimit,
        stateVue,
        attrDataLimit
    }
    return (
        <div>
            <Tabs defaultActiveKey="1">
                <TabPane tab={<span><Icon type="book" />营销模块</span>} key="1">


                    <QueueAnim
                        type={['top', 'top']}
                        ease={['easeOutQuart', 'easeInOutQuart']}
                        className="common-search-queue" >
                        {searchVisible ? [
                            <MarketingPackageSearch {...marketingPackageSearchProps} key="search_queue_weixinFlyer" />
                        ] : null}
                    </QueueAnim>
                    <MarketingPackageList {...marketingPackageListProps} />
                    <MarketingPackageCheckModalNoModal {...marketingPackageCheckModalNoModalProps} />
                    {addOrEditFormVisible == true ? <MarketingPackageAddOrEditModal {...marketingPackageAddOrEditModalProps} /> : null}

                </TabPane>
                {/* <TabPane tab={<span><Icon type="book" />模块与菜单</span>} key="1">
                    <SaasModularManageList {...saasModularManageListProps} />
                    {addOrEditSaasModularModalVisible == true ? <SaasModularManageAddOrEditModular {...saasModularManageAddOrEditModularProps} /> : null}
                </TabPane> */}
                <TabPane tab={<span><Icon type="setting" />套餐设置</span>} key="2">
                    <QueueAnim
                        type={['top', 'top']}
                        ease={['easeOutQuart', 'easeInOutQuart']}
                        className="common-search-queue" >
                        {saasPackageManageSearchVisible ? [
                            <SaasPackageManageSearch {...saasPackageManageSearchProps} key="search_queue_saas_package_mgr" />
                        ] : null}
                    </QueueAnim>
                    <SaasPackageManageTable {...saasPackageManageTableProps} />
                    {saasPackageCheckVisible == true ? <SaasPackageCheckIncludeModularModal {...saasPackageCheckIncludeModularModalProps} /> : null}
                    {addOrEditSaasPackageModalVisible == true ? <SaasPackageManageAddOrEditModal {...saasPackageManageAddOrEditProps} /> : null}
                </TabPane>
                <TabPane tab={<span><Icon type="unlock" />套餐开通</span>} key="3">
                    <QueueAnim
                        type={['top', 'top']}
                        ease={['easeOutQuart', 'easeInOutQuart']}
                        className="common-search-queue" >
                        {saasPackageOpeningSearchVisible ? [
                            <SaasPackageOpeningSearch {...saasPackageOpeningSearchProps} key="search_queue_saas_package_opening" />
                        ] : null}
                    </QueueAnim>
                    <SaasPackageOpeningTable {...saasPackageOpeningTableProps} />
                    {saasPackageOpeningModalVisible == true ? <SaasPackageOpeningModal {...saasPackageOpeningModalProps} /> : null}
                    {saasPackageCheckVisible == true ? <SaasPackageCheckIncludeModularModal {...saasPackageCheckIncludeModularModalProps} /> : null}
                </TabPane>


            </Tabs>
        </div>
    );
}

function mapStateToProps({ saasPackageManage }) {
    return { saasPackageManage };
}

export default connect(mapStateToProps)(SaasPackageManage);
