function DMParse(code)
{
    log(code);
    let lines = code.split("\n");
    log(lines);
    let result = []
    let cur = null;
    const classRe = /^(?:\/\w+)+$/; // /datum/bioEffect/mutantrace/ithillid
    const methodRe = /^(\t+)(\w+)\(\)$/; //    OnAdd()
    // match prop name, ignore spaces between name, equal & value, match value without " and \n
    const propertyRe = /([\w]+) *= *"?([^"]+)"?/; // msgGain = "You feel wet and squishy."
    for (let i = 0; i < lines.length; i++)
    {
        let line = lines[i];
        // Start of Class
        if (classRe.test(line))
        {
            log(`Found class ${line} at line ${i}`);
            if (cur != null) // we were already working on a class => now finished
            {
                result.push(cur);
            }
            cur = {}
            cur.className = line;
            cur.methods = [];
            cur.properties = [];
            cur.line = i;
        }

        // Indented Line
        if (cur && line.startsWith("\t"))
        {
            //Property
            let r = propertyRe.exec(line);
            if (r)
            {
                log(`Found Property ${r[1]} = ${r[2]} at line ${i}`);
                let prop = {}
                prop.name = r[1];
                prop.value = r[2];
                prop.line = i;
                cur.properties.push(prop);
                //parsed property
                continue;
            }

            //Function
            r = methodRe.exec(line);
            if (r)
            {
                log(`Found Method ${r[2]} at line ${i}`);
                //get indentation level
                let level = r[1].length;
                let method = {};
                method.name = r[2];
                method.line = i;
                //skip the func content; not interested
                for (let j = i + 1; j < lines.length; j++)
                {
                    // are we still indented on the func level?
                    if (lines[j].startsWith("\t".repeat(level)))
                    {
                        i = j;
                        continue;
                    }
                    break;
                }
                // we can't do this check inside, cuz we may run out of lines
                if (i > method.line)
                {
                    log(`Skipped lines ${method.line} to ${i} (${i - method.line})`)
                }

                cur.methods.push(method);
                // parsed line
                continue;
            }

            log(`Didn't parse line ${i}:`);
            log(line);
            log("Regex Matches:");
            log("Class " + classRe.test(line));
            log("Method " + methodRe.test(line));
            log("Prop " + propertyRe.test(line));
        }
        else
        {
            log(`Skipping line ${i}`);
            continue; //TODO: this only parses classes
        }
    }
    if (cur)
    {
        result.push(cur);
    }
    console.log(result);
    return result;
}

function log(text)
{
    const debug = true;
    if (debug)
    {
        console.log(text);
    }
}

function ParseTest()
{
    let input = ```
/datum/bioEffect/mutantrace/skeleton
	name = "Ossification"
	desc = "Compacts the subject's living tissues into their skeleton. This is somehow not fatal."
	id = "skeleton"
	mutantrace_option = "Skeleton"
	mutantrace_path = /datum/mutantrace/skeleton
	msgGain = "You feel kinda thin."
	msgLose = "You've put on a bit more weight."
	icon_state  = "skeleton"
	isBad = 1

/datum/bioEffect/mutantrace/ithillid
	name = "Aquatic Genetics"
	desc = "Re-enables ancient vestigal genes in the subject's body."
	id = "ithillid"
	mutantrace_option = "Squid"
	mutantrace_path = /datum/mutantrace/ithillid
	msgGain = "You feel wet and squishy."
	msgLose = "You feel dry."
	icon_state  = "squid"

	OnAdd()
		if (ishuman(owner))
			overlay_image = image("icon" = 'icons/effects/genetics.dmi', "icon_state" = "squidhead", layer = MOB_HAIR_LAYER2)
		..()
```;
DMParse(input);
}