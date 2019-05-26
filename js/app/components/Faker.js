Faker = function () {}
Faker.prototype = {
    fakerType: function (item) {
        return this.Type(item);
        //"'" + item + "'=> $faker->name\n";
    },
    Type: function (string) {
        let check = string.toLowerCase();
        if (check.includes("_id")) {
            let table = string.split("_");
            let modelName = snakeToCamel(table[0].plural(true));
            return "'" + string + "' => function () {\n" +
                "return \\App\\" + modelName + "::inRandomOrder()->first()->id;\n" +
                "\n}";
        }
        if (check.includes("price")) {
            return "'" + string + "' => $faker->randomNumber(2)";
        }
        if (check.includes("description")) {
            return "'" + string + "' => $faker->realText($maxNbChars = 50, $indexSize = 2)";
        }
        if (check.includes("image") || string.includes("avatar")) {
            return "'" + string + "' => $faker->imageUrl($width = 320, $height = 320)";
        }
        if (check.includes("name")) {
            return "'" + string + "' => $faker->name";
        }
        if (check.includes("email")) {
            return "'" + string + "' => $faker->unique()->safeEmail";
        }
        if (check.includes("firstname")) {
            return "'" + string + "' => $faker->firstName";
        }
        if (check.includes("lastname")) {
            return "'" + string + "' => $faker->lastName";

        }
        if (check.includes("phone")) {
            return "'" + string + "' => $faker->mobileNumber";
        }
        if (check.includes("is")) {
            return "'" + string + "' => $faker->boolean(50)";
        }
        if (check.includes("quantity")) {
            return "'" + string + "' => $faker->numberBetween($min = 5, $max = 70)";
        }
        if (check.includes("country")) {
            return "'" + string + "' => $faker->country";
        }
        if (check.includes("city")) {
            return "'" + string + "' =>  $faker->city";
        }
        if (check.includes("district")) {
            return "'" + string + "' =>$faker->district";
        }
        if (check.includes("street")) {
            return "'" + string + "' => $faker->streetAddress";
        }
        if (check.includes("postalcode")) {
            return "'" + string + "' => $faker->postcode";
        }
        if (check.includes("body")) {
            return "'" + string + "' => $faker->realText($maxNbChars = 50, $indexSize = 2)";
        }
        if (check.includes("title")) {
            return "'" + string + "' => $faker->numberBetween($min = 5, $max = 70)";
        }
        if (check.includes("url")) {

            return "'" + string + "' => $faker->url";
        }

        return "'" + string + "' => $faker->name"; 

    }
}