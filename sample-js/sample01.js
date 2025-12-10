(function () {
    "use strict";

    // レコード一覧画面の表示後イベント
    kintone.events.on("app.record.index.show", function (event) {
        // ヘッダーメニューにボタンを追加
        if (kintone.app.getHeaderMenuSpaceElement()) {
            const headerSpace = kintone.app.getHeaderMenuSpaceElement();

            // ボタン要素を作成
            const button = document.createElement("button");
            button.id = "sample-dialog-button";
            button.innerText = "ダイアログを表示";
            button.className = "kintoneplugin-button-dialog";

            // プラグインの設定情報を取得
            const conf = kintone.plugin.app.getConfig("jmagmddpolfhhdapbcjapdianmolmbob");
            const settingData = JSON.parse(conf["config"]);
            const settingJson = JSON.parse(settingData["field_setting_data"]);

            const year = settingJson["year"] || "2024";
            button.innerText = `アドベントカレンダー${year}`;

            const prop0 = settingJson["properties"][0]["first"];
            const prop1 = settingJson["properties"][1]["second"];

            // ボタンクリック時の処理
            button.addEventListener("click", async function () {
                const bodyElement = document.createElement("p");
                bodyElement.innerHTML = `
                    <div>
                        <p>設定プロパティ1: ${prop0}</p>
                        <p>設定プロパティ2: ${prop1}</p>
                    </div>
                `;

                // ダイアログを表示
                const dialog = await kintone.createDialog({
                    title: "アドベントカレンダー2025",
                    body: bodyElement,
                    showCloseButton: true,
                    showCancelButton: true,
                    beforeClose: (action) => {
                        if (action === "OK") {
                            console.log("OKしました");
                        } else {
                            console.log("キャンセルしました");
                        }
                    },
                });

                await dialog.show();
            });

            headerSpace.appendChild(button);
        }

        return event;
    });
})();
