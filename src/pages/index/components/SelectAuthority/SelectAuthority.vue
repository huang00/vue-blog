<template>
    <div class="select-authority fontSize14">
        <div class="switch-config-method" @click="switchConfigMethod">
            {{unifiedDis? '分客栈配置权限': '统一配置权限'}}
        </div>
        <div class="tabs-navs-hotel" v-if="!unifiedDis">
            <tabs-nav :list="hotelList" @on-change="onSwitchHotel"></tabs-nav>
        </div>
        <div style="height: 20px;" v-else></div>
        <ul>
            <li
                class="authority-item"
                v-for="item in treeMenuList"
                :key="item.id"
            >
                <p>
                    <template v-if="item.level === 1 && item.children.length">
                        <Checkbox
                            :indeterminate="item.indeterminate"
                            :value="item.checkAll"
                            @click.prevent.native="handleCheckAll(item)">{{ item.name }}
                        </Checkbox>
                    </template>
                    <template v-if="item.level === 1 && !item.children.length">
                        <Checkbox
                            v-model="item.checkAll"
                        >
                        {{ item.name }}
                        </Checkbox>
                    </template>
                </p>
                <p style="padding-left: 18px;" v-if="item.children">
                    <CheckboxGroup v-model="item.checkAllGroup" @on-change="checkAllGroupChange(item)">
                        <Checkbox
                            :label="subItem.id"
                            v-for="subItem in item.children"
                            :key="subItem.id"
                        >
                        {{ subItem.name }}
                        </Checkbox>
                    </CheckboxGroup>
                </p>
            </li>
        </ul>
        <div class="check-all">
            <Checkbox
                style="width: 60px;"
                v-model="checkAll"
                @on-change="handlerCheckAll"
                :indeterminate="indeterminate"
            >
            全选
            </Checkbox>
        </div>
        <input type="hidden" v-model="allPermissionList">
    </div>
</template>

<script>
import TabsNav from '../TabsNav'
import {
    creatTreeData,
    allPermissionList
} from '@/libs/util'

export default {
    name: 'SelectAuthority',
    props: {
        hotelListIds: {
            type: Array,
            default () {
                return []
            }
        },
        menuListIds: {
            type: Array,
            default () {
                return []
            }
        },
        model: {
            type: String,
            default: 'add'
        }
    },
    data () {
        return {
            hotelList: [
                {value: 1, label: '小试牛刀'},
                {value: 2, label: '神奇大床房'},
                {value: 3, label: '丽江背包十年'}
            ],
            unifiedDis: true, // 统一配置权限
            indeterminate: false,
            checkAll: false,
            checkAllGroup: [],
            innIdPermission: {
                3831: [1, 2, 5],
                3832: [5, 7, 9]
            },
            // treeMenuList: [],
            currentInnId: 0
        }
    },
    created() {
        // for (let i = 0, len = this.hotelListIds.length; i < len; i++) {
        //     let item = this.hotelListIds[i]
        //     this.innIdPermission[item] = 
        // }
    },
    components: {
        TabsNav
    },
    computed: {
        allPermissionList () {
            // let allPermissionList = this.$store.getters.allPermissionList
            // this.treeMenuList = deepCopy(creatTreeData(allPermissionList, allPermissionList.map(item => item.id)))
            // return allPermissionList
            return [
                {id: 1, name: '房态'},
                {id: 2, name: '订单'},
                {id: 3, name: '财务'},
                {id: 4, name: '流水支出表', parentId: 3},
                {id: 5, name: '直连对账表', parentId: 3},
                {id: 6, name: '管理'},
                {id: 7, name: '房型房号', parentId: 6},
                {id: 8, name: '门店信息', parentId: 6}
            ]
        },
        // treeMenuListExce () {
        //     let allPermissionList = this.$store.getters.allPermissionList
        //     this.treeMenuList = deepCopy(creatTreeData(allPermissionList, allPermissionList.map(item => item.id)))
        //     return allPermissionList
        // }
        treeMenuList () {
            return creatTreeData(allPermissionList, [4])
        }
    },
    methods: {
        onSwitchHotel (data) {
            // this.currentInnId = data.value
            // let allPermissionList = this.$store.getters.allPermissionList
            // this.treeMenuList = deepCopy(creatTreeData(allPermissionList, this.innIdPermission[this.currentInnId]))
        },
        switchConfigMethod () {
            /* 设置分配方式 */
            this.unifiedDis = !this.unifiedDis
        },
        handlerCheckAll (val) {
            /* 全选 */
            this.indeterminate = false
            this.checkAll = !this.checkAll
            this.treeMenuList.map(item => {
                if (val) {
                    if (item.children) {
                        let ids = item.children.map(subItem => subItem.id)
                        item.checkAllGroup = ids
                        item.indeterminate = false
                        item.checkAll = true
                    } else {
                        item.checked = true
                    }
                } else {
                    if (item.children) {
                        item.checkAllGroup = []
                        item.indeterminate = false
                        item.checkAll = false
                    } else {
                        item.checked = false
                    }
                }
            })
        },
        handleCheckAll (data) {
            if (data.indeterminate) {
                data.checkAll = false;
            } else {
                data.checkAll = !data.checkAll;
            }
            data.indeterminate = false;

            if (data.checkAll) {
                let ids = data.children.map(item => item.id)
                data.checkAllGroup = ids
            } else {
                data.checkAllGroup = [];
            }
        },
        checkAllGroupChange (data) {
            let checkedLen = data.checkAllGroup.length
            let len = data.children.length
            if (checkedLen === len) {
                data.indeterminate = false;
                data.checkAll = true;
            } else if (checkedLen > 0) {
                data.indeterminate = true;
                data.checkAll = false;
            } else {
                data.indeterminate = false;
                data.checkAll = false;
            }
        }
    },
    watch: {
        treeMenuList: {
            handler (val) {
                let checkAllGroup = []
                let allLen = 0
                let checkedLen = 0
                val.map(item => {
                    if (item.children.length) {
                        allLen += item.children.length
                        checkedLen += item.checkAllGroup.length
                        checkAllGroup = checkAllGroup.concat(item.checkAllGroup)
                    } else {
                        allLen += 1
                        if (item.checkAll) {
                            checkedLen += 1
                            checkAllGroup = checkAllGroup.concat(item.id)
                        }
                    }
                })
                this.innIdPermission[this.currentInnId] = checkAllGroup
                if (allLen === checkedLen) {
                    this.checkAll = true
                    this.indeterminate = false
                } else if (checkedLen > 0) {
                    this.indeterminate = true;
                    this.checkAll = false;
                } else {
                    this.indeterminate = false;
                    this.checkAll = false;
                }
            },
            deep: true
        }
    }
}
</script>

<style lang="scss">
    .select-authority {
        color: #666666;
        // padding-left: 45px;
        .authority-item {
            padding: 5px 0;
        }
        .tabs-navs-hotel {
            margin-top: 40px;
            min-height: 30px;
            // width: 440px;
            background-color: #FBFBFB;
            margin-bottom: 10px;
        }
        .switch-config-method {
            position: absolute;
            top: 8px;
            right: 30px;
            color: #215D91;
            text-decoration: underline;
            cursor: pointer;
        }
        .check-all {
            position: absolute;
            bottom: 15px;
            z-index: 1;
        }
        .ivu-checkbox-wrapper {
            margin-top: 10px;
        }
    }
</style>

