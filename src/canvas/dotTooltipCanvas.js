export default () => {
    /*eslint no-console: 0 */
    const _ = {hidden: null};
    const dotTooltip = d3.select('body').append('div').attr('class', 'ej-dot-tooltip');

    function show(data, tooltip) {
        const props = data.properties;
        const title = Object.keys(props).map(k => k+': '+props[k]).join('<br/>');
        return tooltip.html(title)
    }

    function showTooltip(event, data) {
        const mouse = [event.clientX, event.clientY];
        (_.me.show || show)(data, dotTooltip)
        .style('display', 'block')
        .style('opacity', 1)
        .style('left', mouse[0] + 7 + 'px')
        .style('top', mouse[1] - 15 + 'px');
        _.oldData = data;
        _.hidden = false;
    }

    function hideTooltip() {
        if (!_.hidden) {
            _.hidden = true;
            dotTooltip.style('opacity', 0)
            .style('display', 'none');
        }
    }

    function init() {
        const hoverHandler = (event, data) => {
            if (data && this._.drag!==null) {
                showTooltip(event, data);
            } else {
                hideTooltip();
            }
        }
        this.dotSelectCanvas.onHover({
            dotTooltipCanvas: hoverHandler
        });
    }

    return {
        name: 'dotTooltipCanvas',
        onInit(me) {
            _.me = me;
            init.call(this);
        },
    }
}
