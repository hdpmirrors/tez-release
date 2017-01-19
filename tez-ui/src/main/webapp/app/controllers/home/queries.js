/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Ember from 'ember';

import TableController from '../table';
import ColumnDefinition from 'em-table/utils/column-definition';
import TableDefinition from 'em-table/utils/table-definition';

export default TableController.extend({

  queryParams: ["queryID", "user", "requestUser"],
  queryID: "",
  user: "",
  requestUser: "",

  // Because pageNo is a query param added by table controller, and in the current design
  // we don't want page to be a query param as only the first page will be loaded first.
  pageNum: 1,

  breadcrumbs: [{
    text: "All Queries",
    routeName: "home.queries",
  }],

  moreAvailable: false,
  loadingMore: false,

  headerComponentNames: ['queries-page-search', 'table-controls', 'pagination-ui'],

  _definition: TableDefinition.create(),
  // Using computed, as observer won't fire if the property is not used
  definition: Ember.computed("queryID", "user", "requestUser",
      "pageNum", "moreAvailable", "loadingMore", function () {

    var definition = this.get("_definition");

    definition.setProperties({
      queryID: this.get("queryID"),
      user: this.get("user"),
      requestUser: this.get("requestUser"),

      pageNum: this.get("pageNum"),

      moreAvailable: this.get("moreAvailable"),
      loadingMore: this.get("loadingMore")
    });

    return definition;
  }),

  columns: ColumnDefinition.make([{
    id: 'entityID',
    headerTitle: 'Query ID',
    contentPath: 'entityID',
    cellComponentName: 'em-table-linked-cell',
    getCellContent: function (row) {
      return {
        model: row.get("entityID"),
        text: row.get("entityID")
      };
    }
  },{
    id: 'status',
    headerTitle: 'Status',
    contentPath: 'status',
    cellComponentName: 'em-table-status-cell',
  },{
    id: 'requestUser',
    headerTitle: 'User',
    contentPath: 'requestUser',
  },{
    id: 'tablesRead',
    headerTitle: 'Tables Read',
    contentPath: 'tablesRead',
    getCellContent: function (row) {
      var tablesRead = row.get("tablesRead");
      if(tablesRead && tablesRead.length) {
        return tablesRead.join(",");
      }
    }
  },{
    id: 'tablesWritten',
    headerTitle: 'Tables Written',
    contentPath: 'tablesWritten',
    getCellContent: function (row) {
      var tablesWritten = row.get("tablesWritten");
      if(tablesWritten && tablesWritten.length) {
        return tablesWritten.join(",");
      }
    }
  },{
    id: 'queue',
    headerTitle: 'Queue',
    contentPath: 'queue',
  },{
    id: 'hiveAddress',
    headerTitle: 'Hive Server 2 Address',
    contentPath: 'hiveAddress'
  },{
    id: 'appID',
    headerTitle: 'Application Id',
    contentPath: 'dag.firstObject.appID',
    cellComponentName: 'em-table-linked-cell',
    getCellContent: function (row) {
      return {
        routeName: "app",
        model: row.get("dag.firstObject.appID"),
        text: row.get("dag.firstObject.appID")
      };
    }
  },{
    id: 'queryName',
    headerTitle: 'Query Name',
    contentPath: 'queryName'
  },{
    id: 'dagName',
    headerTitle: 'DAG',
    contentPath: 'dag.firstObject.name',
    cellComponentName: 'em-table-linked-cell',
    getCellContent: function (row) {
      return {
        routeName: "dag",
        model: row.get("dag.firstObject.entityID"),
        text: row.get("dag.firstObject.name")
      };
    }
  },{
    id: 'instanceType',
    headerTitle: 'Client Type',
    contentPath: 'instanceType'
  },{
    id: 'sessionID',
    headerTitle: 'Session ID',
    contentPath: 'sessionID',
  },{
    id: 'clientAddress',
    headerTitle: 'Client Address',
    contentPath: 'clientAddress',
  },{
    id: 'threadName',
    headerTitle: 'Thread Name',
    contentPath: 'threadName',
  },{
    id: 'startTime',
    headerTitle: 'Start Time',
    contentPath: 'startTime',
    cellComponentName: 'date-formatter',
  },{
    id: 'endTime',
    headerTitle: 'End Time',
    contentPath: 'endTime',
    cellComponentName: 'date-formatter',
  },{
    id: 'duration',
    headerTitle: 'Duration',
    contentPath: 'duration',
    cellDefinition: {
      type: 'duration'
    }
  }]),

  getCounterColumns: function () {
    return [];
  },

  actions: {
    search: function (properties) {
      this.setProperties(properties);
    },
    pageChanged: function (pageNum) {
      this.set("pageNum", pageNum);
    },
  }

});
