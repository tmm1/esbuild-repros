import type * as ts from 'typescript';
import sm from 'source-map';
import fs from 'fs';

function mappedPositionFrom(source: string, lc: ts.LineAndCharacter): sm.MappedPosition {
    return { source, line: lc.line + 1, column: lc.character };
}

function lcFrom(position: sm.Position): ts.LineAndCharacter {
    return { line: position.line - 1, character: position.column };
}

function calc(mapfile: string, srcfile: string, c: any) {
    const sourcemap = fs.readFileSync(mapfile, 'utf8');
    const smc = new sm.SourceMapConsumer(sourcemap);
    //smc.eachMapping((m) => { console.log(m) })
    const positionFrom = mappedPositionFrom.bind(null, srcfile);

    const start = lcFrom(smc.generatedPositionFor(positionFrom(c.range.start)));
    const end = lcFrom(smc.generatedPositionFor(positionFrom(c.range.end)));
    console.log()
    console.log(mapfile)
    console.log(start, end)
    console.log(start.character != end.character)
}

const ptyHost = {
    range: {
        start: {
            line: 12,
            character: 41
        },
        end: {
            line: 12,
            character: 50
        }
    }
}
calc('out-esbuild/ptyHostMain.js.map', '../src/ptyHostMain.ts', ptyHost)
calc('out-tsc/ptyHostMain.js.map', '../src/ptyHostMain.ts', ptyHost)

const test = {
    range: {
        start: {
            line: 2,
            character: 14
        },
        end: {
            line: 2,
            character: 31
        }
    }
}
calc('out-esbuild/test.js.map', '../src/test.ts', test)
calc('out-tsc/test.js.map', '../src/test.ts', test)