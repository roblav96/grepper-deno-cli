#!/usr/bin/env -S deno run

import * as cliffy from 'https://deno.land/x/cliffy/command/mod.ts'
import * as Fae from 'https://deno.land/x/fae/mod.ts'
import * as fs from 'https://deno.land/std/fs/mod.ts'
import * as http from 'https://deno.land/std/http/mod.ts'
import * as module from 'https://deno.land/std/node/module.ts'

await new cliffy.Command()
	.throwErrors()
	.name('cliffy')
	.version('0.1.0')
	// completions
	.complete('verbose', () => ['1', '2', '3'], { global: true })
	// options
	.option('-v, --verbose <verbosity:number:verbose>', 'Increase verbosity.', {
		global: true,
		value: (cur, prev = 0) => prev + cur,
	})
	.option('-s, --silent <val:string:my-type>', 'Disable output.', { global: true })
	// animal command
	.command('animal <animal:string:animal>', 'Select an animal.')
	.complete('animal', () => ['dog', 'cat', 'dino'])
	.action((_, animal: string) => console.log(animal))
	// country command
	.command('country <country:string:country>', 'Select a country.')
	.complete('country', () => ['germany', 'spain', 'indonesia'])
	.action((_, country: string) => console.log(country))
	// car command
	.command(
		'car',
		new cliffy.Command()
			.description('Select a car.')
			.complete('color', () => ['Black', 'Red', 'Yellow'])
			.option('-c, --color <color:string:color>', 'other description...', { global: true })
			.command('audi <model:string:audi>')
			.complete('audi', () => ['R8', 'R7'])
			.action(({ color }, model: string) => console.log({ color, model }))
			.command('bmw <model:string:bmw>')
			.complete('bmw', () => ['8er', '7er'])
			.action(({ color }, model: string) => console.log({ color, model }))
			.command('porsche <model:string:porsche>')
			.complete('porsche', () => ['911 GT3 RS', '718 Spyder'])
			.action(({ color }, model: string) => console.log({ color, model })),
	)
	.command('completions', new cliffy.CompletionsCommand())
	.parse()

//

// console.indentLevel = 4
// const watcher = Deno.watchFs('.')
// for await (let event of watcher) {
// 	console.log('event ->', event)
// }
