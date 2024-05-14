import React, { useEffect, useRef } from 'react';
import * as vis from 'vis-network';
import './VisComponent.css'

const VisComponent = (props) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current
    if (!container) return;

    const data = {
      nodes: props.nodes,
      edges: props.edges,
    };

    const options = {
        nodes: {
            shape: 'dot',
            // color: {
            //   border: '#ccc',
            //   background: (node) => (node.id % 2 === 0 ? '#f0f0f0' : '#fff'),
            // },
            scaling: {
                min: 1,
                max: 5,
                customScalingFunction: function (min, max, total, value) {
                  return value;
                },
              },
            size: 30,
            // font: {
            //   font: 'Arial',
            //   size: 30,
              // bold: {
              //   fontWeight: 'bold',
              // },
            //   color: '#fff',
            // },
          },
          edges: {
            width: 2,
            font: { align: "middle" } ,
            length: 400,
            // color: '#333',
            // arrows: 'to',
          },
        //   backgroundColor: '#000000',
          physics: {
            enabled: true,
          },
          interaction: {
            hover: true,
          },
          height: '550px'
    };

    const network = new vis.Network(container, data, options);

    // Optional: Handle network events (clicks, hovers, etc.)
    network.on('click', (event) => {
      console.log('Clicked:', event.nodes[0]);
    });

    // return () => network.destroy(); // Cleanup when component unmounts
  }, [props.nodes, props.edges]);

  return <div ref={containerRef} />;
};

export default VisComponent;
