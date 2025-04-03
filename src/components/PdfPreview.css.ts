import { style } from '@vanilla-extract/css';

export const container = style({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%'
});

export const canvas = style({
  width: '100%',
  height: '100%'
});

export const button = style({
  position: 'absolute',
  right: '12px',
  top: '12px',
  padding: '8px 12px',
  borderRadius: '12px',
  backgroundColor: '#5e5e5e'
});
