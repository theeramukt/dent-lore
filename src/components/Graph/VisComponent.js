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
            // shape: 'dot',
            // labelPosition: 'top',
          },
        edges: {
          width: 2,
          font: { align: "middle" } ,
          arrows: 'to',
        },
        interaction: {
          hover: true,
        },
        height: '550px',
          
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
