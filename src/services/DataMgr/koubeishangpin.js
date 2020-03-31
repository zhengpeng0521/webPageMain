import qs from 'qs';

export async function SearchModalOne(params) {
    return serviceRequest(`${BASE_URL}/sstable/koubeiPro`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
