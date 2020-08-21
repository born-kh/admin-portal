import React, { Component, Fragment, useEffect } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { withRouter } from 'react-router-dom';

import * as d3 from 'd3';
import { useState } from 'react';

const data = {
  server_id: 'NCJHAOWF2MS6D6UXWN6IK53QTOYMXRLDUEJG4MUVLIKDH62EWPLN7I6K',
  now: '2020-07-22T02:03:02.513503761-04:00',
  num_connections: 24,
  total: 24,
  offset: 0,
  limit: 1024,
  connections: [
    {
      cid: 16,
      ip: '139.59.59.234',
      port: 35344,
      start: '2020-06-30T16:38:07.204286532-04:00',
      last_activity: '2020-06-30T16:38:07.435736305-04:00',
      rtt: '220.270651ms',
      uptime: '21d9h24m55s',
      idle: '21d9h24m55s',
      pending_bytes: 0,
      in_msgs: 0,
      out_msgs: 0,
      in_bytes: 0,
      out_bytes: 0,
      subscriptions: 0,
      lang: 'node',
      version: '1.4.0'
    },
    {
      cid: 2302,
      ip: '139.59.59.234',
      port: 55184,
      start: '2020-07-01T23:46:46.070764182-04:00',
      last_activity: '2020-07-01T23:46:46.296606317-04:00',
      rtt: '222.470969ms',
      uptime: '20d2h16m16s',
      idle: '20d2h16m16s',
      pending_bytes: 0,
      in_msgs: 0,
      out_msgs: 0,
      in_bytes: 0,
      out_bytes: 0,
      subscriptions: 0,
      lang: 'node',
      version: '1.4.0'
    },
    {
      cid: 2303,
      ip: '139.59.59.234',
      port: 35638,
      start: '2020-07-01T23:46:46.322331209-04:00',
      last_activity: '2020-07-01T23:46:46.547155246-04:00',
      rtt: '222.553624ms',
      uptime: '20d2h16m16s',
      idle: '20d2h16m15s',
      pending_bytes: 0,
      in_msgs: 0,
      out_msgs: 0,
      in_bytes: 0,
      out_bytes: 0,
      subscriptions: 0,
      lang: 'node',
      version: '1.4.0'
    },
    {
      cid: 3277,
      ip: '139.59.59.234',
      port: 43392,
      start: '2020-07-02T11:31:24.220704218-04:00',
      last_activity: '2020-07-02T11:31:24.551823653-04:00',
      rtt: '219.619105ms',
      uptime: '19d14h31m38s',
      idle: '19d14h31m37s',
      pending_bytes: 0,
      in_msgs: 0,
      out_msgs: 0,
      in_bytes: 0,
      out_bytes: 0,
      subscriptions: 0,
      lang: 'node',
      version: '1.4.0'
    },
    {
      cid: 15127,
      ip: '212.93.190.82',
      port: 28517,
      start: '2020-07-08T05:01:28.040757851-04:00',
      last_activity: '2020-07-20T10:34:37.948349004-04:00',
      rtt: '54.71231268s',
      uptime: '13d21h1m34s',
      idle: '1d15h28m24s',
      pending_bytes: 0,
      in_msgs: 87,
      out_msgs: 108,
      in_bytes: 5806,
      out_bytes: 8418,
      subscriptions: 5,
      lang: '.NET',
      version: '0.0.1'
    },
    {
      cid: 24515,
      ip: '35.247.156.90',
      port: 43368,
      start: '2020-07-13T23:40:07.786719543-04:00',
      last_activity: '2020-07-20T18:23:45.162517064-04:00',
      rtt: '171.48335ms',
      uptime: '8d2h22m54s',
      idle: '1d7h39m17s',
      pending_bytes: 0,
      in_msgs: 2,
      out_msgs: 2,
      in_bytes: 23326,
      out_bytes: 88,
      subscriptions: 9,
      lang: 'node',
      version: '1.3.2'
    },
    {
      cid: 25127,
      ip: '35.247.156.90',
      port: 48212,
      start: '2020-07-14T12:59:50.443649656-04:00',
      last_activity: '2020-07-14T12:59:50.785205311-04:00',
      rtt: '171.827057ms',
      uptime: '7d13h3m12s',
      idle: '7d13h3m11s',
      pending_bytes: 0,
      in_msgs: 0,
      out_msgs: 0,
      in_bytes: 0,
      out_bytes: 0,
      subscriptions: 2,
      lang: 'node',
      version: '1.3.0'
    },
    {
      cid: 25585,
      ip: '46.163.182.218',
      port: 53779,
      start: '2020-07-14T17:17:43.362355526-04:00',
      last_activity: '2020-07-20T02:27:59.239997264-04:00',
      rtt: '217.535096ms',
      uptime: '7d8h45m19s',
      idle: '1d23h35m3s',
      pending_bytes: 0,
      in_msgs: 4,
      out_msgs: 4,
      in_bytes: 64,
      out_bytes: 72,
      subscriptions: 1,
      lang: 'go',
      version: '1.8.1'
    },
    {
      cid: 28355,
      ip: '217.119.85.174',
      port: 53248,
      start: '2020-07-16T03:37:11.462303998-04:00',
      last_activity: '2020-07-20T02:27:59.309679285-04:00',
      rtt: '206.687706ms',
      uptime: '5d22h25m51s',
      idle: '1d23h35m3s',
      pending_bytes: 0,
      in_msgs: 2,
      out_msgs: 2,
      in_bytes: 32,
      out_bytes: 36,
      subscriptions: 1,
      lang: 'go',
      version: '1.8.1'
    },
    {
      cid: 29710,
      ip: '139.59.64.8',
      port: 33060,
      start: '2020-07-19T02:47:32.063200226-04:00',
      last_activity: '2020-07-19T02:47:32.289780254-04:00',
      rtt: '222.579069ms',
      uptime: '2d23h15m30s',
      idle: '2d23h15m30s',
      pending_bytes: 0,
      in_msgs: 0,
      out_msgs: 0,
      in_bytes: 0,
      out_bytes: 0,
      subscriptions: 0,
      lang: 'node',
      version: '1.4.0'
    },
    {
      cid: 29889,
      ip: '54.154.226.3',
      port: 41538,
      start: '2020-07-20T05:34:58.855647581-04:00',
      last_activity: '2020-07-20T05:34:59.181640337-04:00',
      rtt: '153.540051ms',
      uptime: '1d20h28m3s',
      idle: '1d20h28m3s',
      pending_bytes: 0,
      in_msgs: 0,
      out_msgs: 0,
      in_bytes: 0,
      out_bytes: 0,
      subscriptions: 1,
      lang: 'go',
      version: '1.9.2'
    },
    {
      cid: 29890,
      ip: '54.154.226.3',
      port: 1296,
      start: '2020-07-20T05:34:59.433141733-04:00',
      last_activity: '2020-07-20T05:34:59.729950652-04:00',
      rtt: '145.135167ms',
      uptime: '1d20h28m3s',
      idle: '1d20h28m2s',
      pending_bytes: 0,
      in_msgs: 0,
      out_msgs: 0,
      in_bytes: 0,
      out_bytes: 0,
      subscriptions: 1,
      lang: 'go',
      version: '1.9.2'
    },
    {
      cid: 29891,
      ip: '54.154.226.3',
      port: 64684,
      start: '2020-07-20T05:35:00.935946483-04:00',
      last_activity: '2020-07-20T05:35:01.240555319-04:00',
      rtt: '157.240776ms',
      uptime: '1d20h28m1s',
      idle: '1d20h28m1s',
      pending_bytes: 0,
      in_msgs: 0,
      out_msgs: 0,
      in_bytes: 0,
      out_bytes: 0,
      subscriptions: 1,
      lang: 'go',
      version: '1.9.2'
    },
    {
      cid: 30726,
      ip: '91.82.191.132',
      port: 59717,
      start: '2020-07-20T13:26:31.631716882-04:00',
      last_activity: '2020-07-22T02:02:31.603117874-04:00',
      rtt: '187.40808ms',
      uptime: '1d12h36m30s',
      idle: '30s',
      pending_bytes: 0,
      in_msgs: 2196,
      out_msgs: 0,
      in_bytes: 164700,
      out_bytes: 0,
      subscriptions: 0,
      name: 'axon-cron',
      lang: 'go',
      version: '1.9.1'
    },
    {
      cid: 30727,
      ip: '91.82.191.132',
      port: 59718,
      start: '2020-07-20T13:26:31.860496715-04:00',
      last_activity: '2020-07-22T02:02:32.034862985-04:00',
      rtt: '179.331994ms',
      uptime: '1d12h36m30s',
      idle: '30s',
      pending_bytes: 0,
      in_msgs: 0,
      out_msgs: 2088,
      in_bytes: 0,
      out_bytes: 361224,
      subscriptions: 1,
      name: 'axon-influxdb-writer',
      lang: 'go',
      version: '1.9.1'
    },
    {
      cid: 31908,
      ip: '103.221.68.122',
      port: 43630,
      start: '2020-07-21T02:13:11.524426968-04:00',
      last_activity: '2020-07-21T02:13:12.220747505-04:00',
      rtt: '232.454782ms',
      uptime: '23h49m50s',
      idle: '23h49m50s',
      pending_bytes: 0,
      in_msgs: 2,
      out_msgs: 0,
      in_bytes: 544,
      out_bytes: 0,
      subscriptions: 0,
      lang: 'C',
      version: '1.8.0'
    },
    {
      cid: 32020,
      ip: '85.202.225.124',
      port: 50673,
      start: '2020-07-21T05:34:10.673637526-04:00',
      last_activity: '2020-07-21T22:10:13.062170551-04:00',
      rtt: '187.725212ms',
      uptime: '20h28m51s',
      idle: '3h52m49s',
      pending_bytes: 0,
      in_msgs: 0,
      out_msgs: 2,
      in_bytes: 0,
      out_bytes: 14,
      subscriptions: 2,
      lang: 'python3',
      version: '0.10.0'
    },
    {
      cid: 32224,
      ip: '91.82.191.132',
      port: 56374,
      start: '2020-07-21T10:30:10.403805922-04:00',
      last_activity: '2020-07-22T02:02:32.034862985-04:00',
      rtt: '412.435955ms',
      uptime: '15h32m52s',
      idle: '30s',
      pending_bytes: 0,
      in_msgs: 933,
      out_msgs: 933,
      in_bytes: 161409,
      out_bytes: 69975,
      subscriptions: 1,
      lang: 'arduino',
      version: '1.0.0'
    },
    {
      cid: 32458,
      ip: '73.135.73.162',
      port: 53688,
      start: '2020-07-21T17:50:29.441663423-04:00',
      last_activity: '2020-07-21T17:50:30.236833971-04:00',
      rtt: '1m59.804436883s',
      uptime: '8h12m33s',
      idle: '8h12m32s',
      pending_bytes: 0,
      in_msgs: 0,
      out_msgs: 0,
      in_bytes: 0,
      out_bytes: 0,
      subscriptions: 2,
      lang: '.NET',
      version: '0.0.1'
    },
    {
      cid: 32697,
      ip: '103.221.68.122',
      port: 41076,
      start: '2020-07-22T00:44:47.900343652-04:00',
      last_activity: '2020-07-22T02:03:02.490463847-04:00',
      rtt: '240.648914ms',
      uptime: '1h18m14s',
      idle: '0s',
      pending_bytes: 0,
      in_msgs: 18780,
      out_msgs: 0,
      in_bytes: 413160,
      out_bytes: 0,
      subscriptions: 0,
      lang: 'C',
      version: '1.8.0'
    },
    {
      cid: 32702,
      ip: '103.221.68.122',
      port: 51572,
      start: '2020-07-22T01:54:30.901995593-04:00',
      last_activity: '2020-07-22T01:54:31.145340993-04:00',
      rtt: '243.647382ms',
      uptime: '8m31s',
      idle: '8m31s',
      pending_bytes: 0,
      in_msgs: 0,
      out_msgs: 0,
      in_bytes: 0,
      out_bytes: 0,
      subscriptions: 0,
      lang: 'C',
      version: '1.8.0'
    },
    {
      cid: 32703,
      ip: '103.221.68.122',
      port: 51578,
      start: '2020-07-22T01:54:35.937017479-04:00',
      last_activity: '2020-07-22T01:55:01.34561163-04:00',
      rtt: '254.60482ms',
      uptime: '8m26s',
      idle: '8m1s',
      pending_bytes: 0,
      in_msgs: 3,
      out_msgs: 0,
      in_bytes: 644,
      out_bytes: 0,
      subscriptions: 0,
      lang: 'C',
      version: '1.8.0'
    },
    {
      cid: 32706,
      ip: '188.216.167.95',
      port: 60302,
      start: '2020-07-22T02:01:47.312515247-04:00',
      last_activity: '2020-07-22T02:02:57.764868183-04:00',
      rtt: '8.145115994s',
      uptime: '1m15s',
      idle: '4s',
      pending_bytes: 0,
      in_msgs: 12,
      out_msgs: 4,
      in_bytes: 172,
      out_bytes: 148,
      subscriptions: 2,
      lang: '.NET',
      version: '0.0.1'
    },
    {
      cid: 32707,
      ip: '5.135.131.102',
      port: 51860,
      start: '2020-07-22T02:02:02.876000381-04:00',
      last_activity: '2020-07-22T02:02:26.759347482-04:00',
      rtt: '178.892619ms',
      uptime: '59s',
      idle: '35s',
      pending_bytes: 0,
      in_msgs: 0,
      out_msgs: 4,
      in_bytes: 0,
      out_bytes: 148,
      subscriptions: 1,
      lang: '.NET',
      version: '0.0.1'
    }
  ]
};
const NatsStatistics = () => {
  const [natsData, setNatsData] = useState(data.connections);

  // useEffect(() => {}, [
  //   fetch('http://demo.nats.io:8222/connz').then(response => {
  //     console.log(response);
  //   })
  // ]);
  const renderD3 = async () => {
    function formatDate(date) {
      var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      return [year, month, day].join('-');
    }

    let data = natsData.map(item => {
      let children = [];
      let name = item.cid;
      let msgs = [];
      let bytes = [];
      let info = [];
      Object.entries(item).forEach(entry => {
        let [key, value] = entry;

        if (key === 'start' || key == 'last_activity') {
          value = formatDate(value);
        }
        if (key === 'out_msgs' || key === 'in_msgs') {
          msgs.push({ name: key, val: value });
        } else if (
          key === 'out_bytes' ||
          key === 'in_bytes' ||
          key === 'pending_bytes'
        ) {
          bytes.push({ name: key, val: value });
        } else {
          info.push({ name: key, value });
        }
      });
      children.push({ name: 'msgs', children: msgs });
      children.push({ name: 'bytes', children: bytes });
      children.push({ name: 'info', children: info });
      return { name, children };
    });

    const width = 954;
    const height = 954;

    data = { name: 'nats', children: data };

    const pack = data =>
      d3
        .pack()
        .size([width, height])
        .padding(3)(
        d3
          .hierarchy(data)
          .sum(d => (d.val ? d.val : 1000))
          .sort((a, b) => b.name > a.name)
      );

    const root = pack(data);

    let focus = root;
    let view;
    const color = d3
      .scaleLinear()
      .domain([0, 5])
      .range(['hsl(152,80%,80%)', 'hsl(228,30%,40%)'])
      .interpolate(d3.interpolateHcl);
    const svg = d3
      .select('#nats-svg')
      .attr('viewBox', `-${width / 2} -${height / 2} ${width} ${height}`)
      .style('display', 'block')
      .style('margin', '0')
      .style('background', color(0))
      .style('cursor', 'pointer')
      .on('click', () => zoom(root));
    const node = svg
      .append('g')
      .selectAll('circle')
      .data(root.descendants().slice(1))
      .join('circle')
      .attr('fill', d => {
        if (d.children) {
          if (d.data.name === 'msgs') {
            return color(6);
          } else if (d.data.name === 'bytes') {
            return color(4);
          }
        }
        return d.children ? color(d.depth) : 'white';
      })
      .attr('pointer-events', d => (!d.children ? 'none' : null))
      .on('mouseover', function() {
        d3.select(this).attr('stroke', '#000');
      })
      .on('mouseout', function() {
        d3.select(this).attr('stroke', null);
      })
      .on('click', d => focus !== d && (zoom(d), d3.event.stopPropagation()));

    const label = svg
      .append('g')
      .style('font', '10px sans-serif')
      .attr('pointer-events', 'none')
      .attr('text-anchor', 'middle')
      .selectAll('text')
      .data(root.descendants())
      .join('text')
      .style('fill-opacity', d => (d.parent === root ? 1 : 0))
      .style('display', d => (d.parent === root ? 'inline' : 'none'))
      .text(d =>
        !d.data.value
          ? `${d.data.name} ${d.data.val ? d.data.val : ''}`
          : `${d.data.name} ${d.data.value}`
      );

    zoomTo([root.x, root.y, root.r * 2]);

    function zoomTo(v) {
      const k = width / v[2];

      view = v;

      label.attr('transform', d => {
        return `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`;
      });
      node.attr(
        'transform',
        d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`
      );
      node.attr('r', d => d.r * k);
    }

    function zoom(d) {
      focus = d;

      const transition = svg
        .transition()
        .duration(d3.event.altKey ? 7500 : 750)
        .tween('zoom', d => {
          const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
          return t => zoomTo(i(t));
        });

      label
        .filter(function(d) {
          return d.parent === focus || this.style.display === 'inline';
        })
        .transition(transition)
        .style('fill-opacity', d => (d.parent === focus ? 1 : 0))
        .on('start', function(d) {
          if (d.parent === focus) this.style.display = 'inline';
        })
        .on('end', function(d) {
          if (d.parent !== focus) this.style.display = 'none';
        });
    }
  };

  useEffect(() => {
    renderD3();
  }, []);

  return <svg id="nats-svg" style={{ width: '100%', height: '88vh' }} />;
};

export default withRouter(NatsStatistics);
