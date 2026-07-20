const fs = require('fs');
const path = require('path');

// 1. Fix backend jwt.strategy.ts
const jwtPath = path.join(__dirname, 'backend/src/auth/jwt.strategy.ts');
if (fs.existsSync(jwtPath)) {
  let content = fs.readFileSync(jwtPath, 'utf8');
  content = content.replace(
    'private readonly configService: ConfigService,',
    'configService: ConfigService,'
  );
  fs.writeFileSync(jwtPath, content, 'utf8');
}

// 2. Fix frontend unused React imports
const frontendSrc = path.join(__dirname, 'frontend/src');

function cleanReactImports(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      cleanReactImports(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // If the file uses React.FC, React.ReactNode, React.useState, etc., we shouldn't remove it.
      // But if it just has "import React from 'react';" and NEVER uses "React.", we can remove it.
      if (content.includes("import React from 'react';") && !content.includes("React.")) {
        content = content.replace("import React from 'react';\n", "");
      }
      // What about "import React, { useState } from 'react';"?
      if (content.includes("import React, {") && !content.includes("React.")) {
        content = content.replace("import React, {", "import {");
      }

      fs.writeFileSync(fullPath, content, 'utf8');
    }
  }
}

cleanReactImports(frontendSrc);
console.log('Cleanup completed successfully.');
