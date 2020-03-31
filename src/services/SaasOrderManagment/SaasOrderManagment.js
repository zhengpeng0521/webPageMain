import qs from 'qs';

/*套餐订单列表*/
export async function hqQueryPkgOrder(params) {
  return serviceRequest(`${BASE_URL}/pkgOrder/hqQueryPkgOrder`, {
    method: 'post',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

/*套餐订单详情*/
export async function hqQueryDetail(params) {
  return serviceRequest(`${BASE_URL}/pkgOrder/hqQueryDetail`, {
    method: 'post',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

/*审核订单付款信息*/
export async function hqReviewPkgOrder(params) {
  return serviceRequest(`${BASE_URL}/pkgOrder/hqReviewPkgOrder`, {
    method: 'post',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}
/*订单付款信息*/
export async function hqQueryPayInfo(params) {
  return serviceRequest(`${BASE_URL}/pkgOrder/hqQueryPayInfo`, {
    method: 'post',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

/*导出菜单*/
export async function hqExportPkgOrder(params) {
  return serviceRequest(`${BASE_URL}/pkgOrder/hqExportPkgOrder`, {
    method: 'post',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}