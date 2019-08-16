var express = require('express');
var router = express.Router();
var mongodb = require('./mongodb');

router.get('/test', function (req, res, next) {
    res.status(200).send("GOOD");
})


router.get('/login_RPN_list', function (req, res, next) {
    res.status(200).json({
        "date": "2019/08/09 18:20:35",
        "RPN":
            [
                {
                    "UID_RPN": 135,
                    "Name": "陳小姐"
                },
                {
                    "UID_RPN": 257,
                    "Name": "王小姐"
                },
                {
                    "UID_RPN": 457,
                    "Name": "趙先生"
                },
                {
                    "UID_RPN": 432,
                    "Name": "王曉明"
                }
            ]
    })
})

router.post('/RPN_device_list/:id', function (req, res) {
    if (req.params.id) {
        res.json({
            "date": "2019/08/09 18:20:35",
            "device_list":
                [
                    {
                        "UID_Device": 18,
                        "BLE_NAME": "ECG-XXXXXXXXXXXX",
                        "BATT": 73,
                        "MRN": "12345678",
                        "Name": "柯博文"
                    },
                    {
                        "UID_Device": 34,
                        "BLE_NAME": "ECG-XXXXXXXXXXXX",
                        "BATT": 73,
                        "MRN": "1576323",
                        "Name": "王阿明"
                    },
                    {
                        "UID_Device": 6872,
                        "BLE_NAME": "ECG-XXXXXXXXXXXX",
                        "BATT": 73,
                        "MRN": "15233678",
                        "Name": "李啊哈"
                    },
                    {
                        "UID_Device": 6729,
                        "BLE_NAME": "ECG-XXXXXXXXXXXX",
                        "BATT": 36,
                        "MRN": "8534",
                        "Name": "賈伯斯"
                    }
                ]
        });
    }
});

router.post('/RPN_device_pair/:UID_RPN/:BLE_NAME/:MRN', function (req, res) {
    if (req.params.UID_RPN && req.params.BLE_NAME && req.params.MRN) {
        res.json({
            "date": "2019/08/09 18:20:35",
            "pair_status": "OK/Error",
            "device_info":
            {
                "UID_Device": 19,
                "BLE_NAME": "ECG-XXXXXXXXXXXX",
                "BATT": 73,
                "MRN": "12345678",
                "Name": "柯博文"
            }
        })
    };
})

router.post('/RPN_device_unpair/:BLE_name', function (req, res) {
    if (req.params.BLE_name) {
        res.json({
            "date": "2019/08/09 18:20:35",
            "pair_status": "OK/Error"
        })
    }
})

router.post('/RTECG/:UID_Device', function (req, res) {
    if (req.params.UID_Device) {
        res.json({
            "date": "2019/08/09 18:20:35",
            "data_point_CH1":
                [
                    {
                        "UID_data": 137896,
                        "date_ms": "2019/08/09 18:20:35.1378",
                        "value": 123,
                        "PeakPoint": true
                    },
                    {
                        "UID_data": 137897,
                        "date_ms": "2019/08/09 18:20:35.1378",
                        "value": 124,
                        "PeakPoint": false
                    },
                    {
                        "UID_data": 137898,
                        "date_ms": "2019/08/09 18:20:35.1378",
                        "value": 125,
                        "PeakPoint": true
                    }
                ],
            "data_point_CH2":
                [
                    {
                        "UID_data": 137896,
                        "date_ms": "2019/08/09 18:20:35.1378",
                        "value": 123,
                        "PeakPoint": true
                    },
                    {
                        "UID_data": 137897,
                        "date_ms": "2019/08/09 18:20:35.1378",
                        "value": 124,
                        "PeakPoint": false
                    },
                    {
                        "UID_data": 137898,
                        "date_ms": "2019/08/09 18:20:35.1378",
                        "value": 125,
                        "PeakPoint": true
                    }
                ]
        });
    }

})

router.post('/SEECG/:UID_Device/:date_start_ms/:date_end_ms', function (req, res) {
    if (req.params.UID_Device && req.params.date_start_ms && req.params.date_end_ms) {
        res.json({
            "date": "2019/08/09 18:20:35",
            "data_point_amount": 500,
            "data_point_CH1":
                [
                    {
                        "UID_data": 137896,
                        "date_ms": "2019/08/09 18:20:35.1378",
                        "value": 123,
                        "PeakPoint": true
                    },
                    {
                        "UID_data": 137897,
                        "date_ms": "2019/08/09 18:21:35.1378",
                        "value": 124,
                        "PeakPoint": false
                    },
                    {
                        "UID_data": 137898,
                        "date_ms": "2019/08/09 18:22:35.1378",
                        "value": 125,
                        "PeakPoint": true
                    }
                ],
            "data_point_CH2":
                [
                    {
                        "UID_data": 137896,
                        "date_ms": "2019/08/09 18:20:35.1378",
                        "value": 123,
                        "PeakPoint": true
                    },
                    {
                        "UID_data": 137897,
                        "date_ms": "2019/08/09 18:21:35.1378",
                        "value": 124,
                        "PeakPoint": false
                    },
                    {
                        "UID_data": 137898,
                        "date_ms": "2019/08/09 18:22:35.1378",
                        "value": 125,
                        "PeakPoint": true
                    }
                ]
        })
    };

})
module.exports = router;