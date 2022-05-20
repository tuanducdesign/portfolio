import { SVGProps } from 'react';
import { Graphql } from './Graphql';
import { NextJs } from './NextJs';
import { Gatsby } from './Gatsby';
import { ExpressJs } from './ExpressJs';
import { Javascript } from './Javascript';
import { MongoDb } from './MongoDb';
import { NodeJs } from './NodeJs';
import { Svelte } from './Svelte';
import { Typescript } from './Typescript';
import { Vue } from './Vue';
import { ReactJs } from './ReactJs';
import { Go } from './Go';
import { Docker } from './Docker';
import { Redis } from './Redis';
import { Postgresql } from './Postgresql';

export type IconName =
  | 'javascript'
  | 'typescript'
  | 'vue'
  | 'react_js'
  | 'express_js'
  | 'mongo_db'
  | 'node_js'
  | 'svelte'
  | 'gatsby'
  | 'next_js'
  | 'graphql'
  | 'docker'
  | 'redis'
  | 'postgres'
  | 'go';

type TechIconProps = {
  name: IconName;
  size?: number;
} & SVGProps<SVGSVGElement>;

export const TechIcon = ({ name, size = 24, ...props }: TechIconProps) => {
  switch (name) {
    case 'react_js':
      return <ReactJs width={size} height={size} {...props} />;
    case 'node_js':
      return <NodeJs width={size} height={size} {...props} />;
    case 'express_js':
      return (
        <ExpressJs width={size} height={size} {...props} fill="currentColor" />
      );
    case 'mongo_db':
      return <MongoDb width={size} height={size} {...props} />;
    case 'svelte':
      return <Svelte width={size} height={size} {...props} />;
    case 'vue':
      return <Vue width={size} height={size} {...props} />;
    case 'typescript':
      return <Typescript width={size} height={size} {...props} />;
    case 'javascript':
      return <Javascript width={size} height={size} {...props} />;
    case 'gatsby':
      return <Gatsby width={size} height={size} {...props} />;
    case 'next_js':
      return <NextJs width={size} height={size} {...props} />;
    case 'graphql':
      return <Graphql width={size} height={size} {...props} />;
    case 'go':
      return <Go width={size} height={size} {...props} />;
    case 'docker':
      return <Docker width={size} height={size} {...props} />;
    case 'redis':
      return <Redis width={size} height={size} {...props} />;
    case 'postgres':
      return <Postgresql width={size} height={size} {...props} />;
    default:
      return <span />;
  }
};
