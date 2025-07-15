import type * as ts from 'typescript';
import sm from 'source-map';
import fs from 'fs';

function mappedPositionFrom(source: string, lc: ts.LineAndCharacter): sm.MappedPosition {
    return { source, line: lc.line + 1, column: lc.character };
}

function lcFrom(position: sm.Position): ts.LineAndCharacter {
    return { line: position.line - 1, character: position.column };
}

const c = {
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


function calc(mapfile: string) {
    const sourcemap = fs.readFileSync(mapfile, 'utf8');
    const smc = new sm.SourceMapConsumer(sourcemap);
    //smc.eachMapping((m) => { console.log(m) })
    const positionFrom = mappedPositionFrom.bind(null, '../src/ptyHostMain.ts');

    const start = lcFrom(smc.generatedPositionFor(positionFrom(c.range.start)));
    const end = lcFrom(smc.generatedPositionFor(positionFrom(c.range.end)));
    console.log()
    console.log(mapfile)
    console.log(start, end)
    console.log(start.character != end.character)
}

calc('out-esbuild/ptyHostMain.js.map')
calc('out-tsc/ptyHostMain.js.map')