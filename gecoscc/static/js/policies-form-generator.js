/*jslint browser: true, vars: false, nomen: true, unparam: true */
/*global App */

// Copyright 2014 Junta de Andalucia
//
// Licensed under the EUPL, Version 1.1 or - as soon they
// will be approved by the European Commission - subsequent
// versions of the EUPL (the "Licence");
// You may not use this work except in compliance with the
// Licence.
// You may obtain a copy of the Licence at:
//
// http://ec.europa.eu/idabc/eupl
//
// Unless required by applicable law or agreed to in
// writing, software distributed under the Licence is
// distributed on an "AS IS" basis,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
// express or implied.
// See the Licence for the specific language governing
// permissions and limitations under the Licence.

App.module("Policies.Views", function (Views, App, Backbone, Marionette, $, _) {
    "use strict";

    /*
    * This view requires a policy model and a resource.
    *
    * Attributes:
    *   - model: The policy to configure
    *   - resource: The node of the tree subject of the policy
    */
    Views.PolicyGenericForm = Marionette.ItemView.extend({
        template: "#policy-template",
        tagName: "div",
        className: "col-sm-12",

        initialize: function (options) {
            if (!_.has(options, "resource")) {
                throw "This view requires a resource to be specified";
            }
            this.resource = options.resource;
        },

        serializeData: function () {
            var data = {
                    schema: this.model.get("schema")
                },
                id = this.model.get("id"),
                values;

            values = this.resource.get("policies")[id];
            if (!_.isUndefined(values)) {
                data.values = values;
            }
            return data;
        },

        render: function () {
            var data, policyData, template, $html;

            this.isClosed = false;

            this.triggerMethod("before:render", this);
            this.triggerMethod("item:before:render", this);

            policyData = this.mixinTemplateHelpers(this.model.toJSON());
            template = this.getTemplate();
            $html = $(Marionette.Renderer.render(template, policyData));

            data = this.serializeData();
//             $html = $("<form></form>");
            $html.find("form").jsonForm({
                // Object that describes the data model
                schema: data.schema //,
                // Array that describes the layout of the form
//                 form: [],
//                 // Callback function called upon form submission when values are valid
//                 onSubmitValid: function (values) {
//                     return; // TODO
//                 }
            });

            this.$el.html($html);
            this.bindUIElements();

            this.triggerMethod("render", this);
            this.triggerMethod("item:rendered", this);

            return this;
        }
    });
});
