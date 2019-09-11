const express = require('express');
const multer = require('multer'); // 文件上传模块
const async = require('async');

const fs = require("fs");
var multiparty = require('multiparty');

const fileUpload = require('../modules/mc_fileUpload');
const fileIO = require('../modules/mc_fileIO');
const func = require('../modules/mc_func');

const dbInfo = require('../modules/dbInfo.json');
// const pool = func.dbConnect(dbInfo);
const mysql = require('mysql');
const pool = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '',
    database: 'xz'
});
var router = express.Router();

module.exports = router;

// 查询补件项
router.get('/supply', (req, res) => {
    let data = [
        { id: 1, href: '../supply/personal.html', src: 'img/supply_personal.png', title: '个人信息', finish: '1' },
        { id: 2, href: '../supply/capital.html', src: 'img/supply_capital.png', title: '资产情况', finish: '0' },
        { id: 3, href: '../supply/service.html', src: 'img/supply_service.png', title: '运营商认证', finish: '0' },
        { id: 4, href: '../supply/replenish.html', src: 'img/supply_replenish.png', title: '补充授权', finish: '0' },
        { id: 5, href: '../supply/work.html', src: 'img/supply_work.png', title: '工作信息', finish: '0' },
        { id: 6, href: '../supply/social.html', src: 'img/supply_social.png', title: '社交信息', finish: '0' },
        { id: 7, href: '../supply/other.html', src: 'img/supply_other.png', title: '其他信息', finish: '0' },
    ]
    res.send({ code: '0000', resultList: data });
})

// 查询个人信息
router.get('/personal', (req, res) => {

    let data = [
        { title: '期望借款金额', detail: '8000' },
        { title: '学历', detail: '本科' },
        { title: '月均收入', detail: '8000-12000' },
        { title: '单位名称', detail: '深圳市信息技术有限公司' },
        { title: '单位地址', detail: '广东省,深圳市,南山区' },
        { title: '', detail: '前进一路水口花园3号' },
        { title: '居住地址', detail: '广东省,深圳市,宝安区' },
        { title: '', detail: '前进一路水口花园3号' },
    ]
    res.send({ code: '0000', resultList: data });
});
// 查询资产情况
router.get('/capital', (req, res) => {

    let dataObj = {
        fields: [
            { id: 1, label: '负债情况', name: 'liability' },
            { id: 2, label: '现居住情况', name: 'location' },
        ],
        fieldData: [{
            id: 1,
            name: 'liability',
            data: [{ title: '银行贷款', value: 'bank' },
                { title: '花呗', value: 'huabei' },
                { title: '京东白条', value: 'jd' },
            ]
        }, {
            id: 2,
            name: 'location',
            data: [{ title: '个人住房', value: 'Z01' },
                { title: '个人租房', value: 'Z02' },
            ]
        }]
    }

    res.send({ code: '0000', resultList: dataObj });
})

// 查询工作信息列表
router.get('/work', (req, res) => {

    let dataObj = {
        fields: [
            { id: 1, label: '职业身份', name: 'identity', opt: '1' },
            { id: 2, label: '所属行业', name: 'industry', opt: '1' },
            { id: 2, label: '职业类别', name: 'category', opt: '1' },
            { id: 2, label: '单位电话', name: 'phone', opt: '0' },
            { id: 2, label: '常用邮箱', name: 'mail', opt: '0' },
            { id: 2, label: '工作年限', name: 'life', opt: '1' },
            { id: 2, label: '当前工作入职时间', name: 'initiate', opt: '1' },
        ],
        fieldData: [{
                id: 1,
                name: 'identity',
                data: [
                    { id: 1, title: '学生', value: 'stu' },
                    { id: 2, title: '医生', value: 'doc' },
                    { id: 1, title: '教师', value: 'teac' },
                ]
            },
            {
                id: 2,
                name: 'industry',
                data: [
                    { id: 1, title: '教育', value: 'class' },
                    { id: 2, title: '制造', value: 'made' },
                    { id: 1, title: '服务', value: 'serv' },
                ]
            },
            {
                id: 3,
                name: 'category',
                data: [
                    { id: 1, title: '工程', value: 'pro' },
                    { id: 2, title: '医疗', value: 'hos' },
                    { id: 1, title: '教育', value: 'teach' },
                ]
            },
            {
                id: 4,
                name: 'life',
                data: [
                    { id: 1, title: '1年以下', value: '1' },
                    { id: 2, title: '1-3年', value: '2' },
                    { id: 1, title: '3年以上', value: '3' },
                ]
            }
        ]
    }
    res.send({ code: '0000', resultList: dataObj })
})

// 查询其他信息
router.get('/other', (req, res) => {
    let dataObj = {
        fields: [
            { id: 1, label: '期望借款期限', name: 'date' },
            { id: 2, label: '借款用途', name: 'using' }
        ],
        fieldData: [{
            id: 1,
            name: 'date',
            data: [{ id: 1, title: '3期', value: '3' },
                { id: 2, title: '6期', value: '6' },
                { id: 3, title: '9期', value: '9' },
                { id: 4, title: '12期', value: '12' },
                { id: 5, title: '15期', value: '15' },
                { id: 6, title: '18期', value: '18' },
            ]
        }, {
            id: 2,
            name: 'using',
            data: [{ id: 1, title: '购物', value: 'U01' },
                { id: 2, title: '临时救急', value: 'U02' }
            ]
        }]
    }

    res.send({ code: '0000', resultList: dataObj });
})

// 查询其他协议
router.get('/protocol', (req, res) => {
    let data = [
        { id: 1, label: '《小景金融平台服务协议》', value: 'P01', url: '' },
        { id: 1, label: '《中银消费新易贷-贷款合同》', value: 'P02', url: '' },
        { id: 1, label: '《征信查询合同》', value: 'P03', url: '' }
    ]
    res.send({ code: '0000', resultList: data });
})

// 查询授权项
router.get('/replenish', (req, res) => {
    let data = [
        { id: 1, label: '公积金', value: 'R01', href: '/', grant: '0' },
        { id: 1, label: '社保', value: 'R02', href: '/', grant: '0' },
        { id: 1, label: '信用卡', value: 'R03', href: '/', grant: '0' }
    ]
    res.send({ code: '0000', resultList: data });
})

// 查询社交信息
router.get('/social', (req, res) => {
    let data = [
        { id: 1, label: 'qq', name: 'qq' }
    ]
    res.send({ code: '0000', resultList: data });
})