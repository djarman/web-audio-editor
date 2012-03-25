/**
 * Author: Jan Myler <honza.myler@gmail.com>
 * 
 * View for a single editor track.
 */

define([
    'underscore',
    'backbone',
    'Audiee/Views.EditableName',
    'Audiee/Views.TrackDisplay',
    'Audiee/Views.TrackControls',
    'Audiee/Views.Clips'
], function(_, Backbone, EditableNameV, TrackDisplayV, TrackControlsV, ClipsV) {

    return Backbone.View.extend({
        tagName: 'div',
        className: 'track',

        initialize: function () {
            _.bindAll(this, 'render', 'remove', 'zoomChange');
            this.model.bind('destroy', this.remove);
            this.model.bind('Audiee:zoomChange', this.zoomChange);
        },

        render: function() {
            console.log('Track.render()');
            this.editableName = new EditableNameV({
                model: this.model,
                className: 'track-name',
                hasColor: true
            }),
            this.trackDisplay = new TrackDisplayV({
                model: this.model
            }),
            this.trackControls = new TrackControlsV({
                // TODO: code...
            });

            var width = Audiee.Display.sec2px(this.model.get('length'));
            $(this.el).empty().width(width)   
                .append(this.editableName.el)
                .append(this.trackControls.el)
                .append(this.trackDisplay.el);

            new ClipsV({
                collection: this.model.clips,
                el: $('.track-display', this.el)
            }).render();

            return this;
        },

        remove: function() {
            $(this.el).remove();
        },

        zoomChange: function() {
            var width = Audiee.Display.sec2px(this.model.get('length'));
            $(this.el).width(width);
        }
    });
});