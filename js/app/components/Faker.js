faker = function () {}
faker.prototype = {
    fakerType: function (item) {
        return this.Type(item);
        //"'" + item + "'=> $faker->name\n";
    },
    Type: function (string) {

        if (string.includes("_id")) {
            let table = string.split("_");
            let modelName = snakeToCamel(table[0].plural(true));
            return "'" + string + "' => function () {\n" +
                "return \App\\"+modelName+"\\Model\\" + modelName + "::inRandomOrder()->first()->id;\n" +
                "\n}";
        }
        if (string.includes("price")) {
            return "'" + string + "' => $faker->randomNumber(2)";
        }
        if (string.includes("description")) {
            return "'" + string + "' => $faker->realText($maxNbChars = 50, $indexSize = 2)";
        }
        if (string.includes("image") || string.includes("avatar")) {
            return "'" + string + "' => $faker->imageUrl($width = 320, $height = 320)";
        }
        if (string.includes("name")) {
            return "'" + string + "' => $faker->name";
        }
        if (string.includes("email")) {
            return "'" + string + "' => $faker->unique()->safeEmail";
        }
        if (string.includes("firstName")) {
            return "'" + string + "' => $faker->firstName";
        }
        if (string.includes("lastName")) {
            return "'" + string + "' => $faker->lastName";

        }
        if (string.includes("phone")) {
            return "'" + string + "' => $faker->mobileNumber";
        }
        if (string.includes("is")) {
            return "'" + string + "' => $faker->boolean(50)";
        }
        if (string.includes("quantity")) {
            return "'" + string + "' => $faker->numberBetween($min = 5, $max = 70)";
        }
        if (string.includes("country")) {
            return "'" + string + "' => $faker->country";
        }
        if (string.includes("city")) {
            return "'" + string + "' =>  $faker->city";
        }
        if (string.includes("district")) {
            return "'" + string + "' =>$faker->district";
        }
        if (string.includes("street")) {
            return "'" + string + "' => $faker->streetAddress";
        }
        if (string.includes("postalCode")) {
            return "'" + string + "' => $faker->postcode";
        }
        if (string.includes("body")) {
            return "'" + string + "' => $faker->realText($maxNbChars = 50, $indexSize = 2)";
        }
        if (string.includes("title")) {
            return "'" + string + "' => $faker->numberBetween($min = 5, $max = 70)";
        }
        if (string.includes("url")) {

            return "'" + string + "' => $faker->url";
        }

    }
}