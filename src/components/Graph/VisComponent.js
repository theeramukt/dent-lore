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
            // shapeProperties: {
            //   borderRadius: 50
            // },
            labelInside: true,
            labelGravity: false,
            scaling: {
              enabled: true,
              min: 5,
              max: 150,
              // label: {
              //   min: 8,
              //   max: 20,
              // },
            },
            color: "#cba7c1",
            widthConstraint: {
              maximum: 200
            }
            // labelPosition: 'top',
          },
        edges: {
          width: 2,
          // font: { align: "middle" } ,
          arrows: 'to',
          widthConstraint: {
            maximum: 200
          },
          length: 300,
        },
        interaction: {
          hover: true,
        },
        physics: {
          enabled: true,
          barnesHut: {
            gravitationalConstant: -8000,
            springConstant: 0.05,
            damping: 0.4,
          },
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
